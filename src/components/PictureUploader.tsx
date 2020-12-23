import React, { ReactNode, useState } from "react";
import FlipMove from "react-flip-move";
import { DeleteOutlined, EyeOutlined, PlusOutlined } from "@ant-design/icons/lib";
import { Button, Form, message, Modal, Upload } from "antd";
import styled from "styled-components";
import Tools from "@utils/tools";
import AdminApi from "@apis/admin";
import style from '@assets/global-style';
interface PictureUploaderParams {
  hint?: string | ReactNode,
  value: {
    imageList: Array<any>,
    cover: string
  },
  onChange?: Function,
  onRemove?: Function,
  limits?: {
    types: Array<string>,
    size: number
  },
  showCover?: boolean,
  maxNumber?: number,
  coverProps?: {
    buttonName: string,
    coverName: string,
    bgColor: string
  }
}

/**
 * 图片上传
 * @param props
 */
const PictureUploader = (props) => {

  const { hint, value = {
    imageList: [],
    cover: ""
  }, onChange, limits, showCover = true, maxNumber = 12, coverProps = {
    buttonName: "设为封面",
    coverName: "封面",
    bgColor: "#79d8db"
  } } = props;

  // 预览图片
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [previewUid, setPreviewUid] = useState("");
  // 预览模态框visible
  const [previewModalVisible, setPreviewModalVisible] = useState(false);

  // 获取base64
  const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  };

  // 处理图片预览
  const handlePreview = (file) => {
    if (!file.url && !file.preview) {
      // file.preview = await getBase64(file.originFileObj);
      console.dir(file)
      file.preview = file.response?.cdnPrefix + file.response?.key;
    }
    setPreviewImage(file.url || file.preview);
    setPreviewModalVisible(true);
    setPreviewTitle(file.name);
    setPreviewUid(file.uid)
  };
  // 处理移除图片
  const handleRemove = (uid) => {
    const result = value.imageList.filter(item => item.uid !== uid);
    let tmpCover = value.cover;
    if (uid === tmpCover) {
      tmpCover = result.length > 0 ? result[0].uid : null;
    }
    handleChange({ imageList: result, cover: tmpCover })
  };

  //  处理设置封面
  const handleSetCover = () => {
    handleChange({ cover: previewUid });
    setPreviewModalVisible(false);
  };
  // 处理上传文件改变
  const handleFileChange = ({ file, fileList }) => {
    const tmp = [...fileList];
    if (file.response) {
      tmp.forEach((item) => {
        if (!item.url && !item.preview && item.response) {
          item.preview = item.response.cdnPrefix + "" + item.response.key;
          item.url = item.response.cdnPrefix + "" + item.response.key;
          item.path = item.response.key;
          item.width = item.response.width;
          item.height = item.response.height;
        }
        return item;
      })
    }
    let tmpCover = value.cover;
    if (!tmpCover) {
      tmpCover = fileList.length > 0 ? fileList[0].uid : null;
    }
    handleChange({ imageList: tmp, cover: tmpCover })
  };


  /**
   * 处理form改变
   * @param changedValue
   */
  const handleChange = changedValue => {
    if (onChange) {
      onChange({ ...value, ...changedValue });
    }
  };

  return (
    <Container>
      <UploadHintContainer>{hint || "请上传清晰、实拍的室内图片，请不要在图片上添加文字、数字、网址等内容，请勿上传名片、二维码、自拍照、风景照等与房源无关的图片，最多上传12张，每张最大10M"}</UploadHintContainer>
      <div className='global-center'>
        <FlipMove style={{ display: "flex", flexWrap: "wrap" }}>
          <>
            {
              value.imageList.map((file, index) => {
                return (
                  <div key={file.uid} className='img-file-item'>
                    <div className='img-wrap'>
                      <img className='img-file' src={file.url || file.preview} alt="" />
                      <div className='img-hover'>
                        <span onClick={() => handlePreview(file)}><EyeOutlined className="thumbnail-icon" title="预览" /></span>
                        <span onClick={() => handleRemove(file.uid)}><DeleteOutlined className="thumbnail-icon" title="删除" /></span>
                      </div>
                      {showCover && file.uid === value.cover && <div className='img-cover'>{coverProps.coverName}</div>}
                    </div>
                  </div>
                )
              })
            }
            <Upload
              style={{ display: "inline-block" }}
              listType="picture-card"
              fileList={value.imageList}
              multiple={true}
              showUploadList={false}
              onPreview={handlePreview}
              beforeUpload={(file) => beforeUpload(file, limits)}
              onChange={handleFileChange}
              customRequest={handleUpload}
            >
              {value.imageList.length >= maxNumber ? null : uploadButton}
            </Upload>
          </>
        </FlipMove>
      </div>
      <Modal
        visible={previewModalVisible}
        title={previewTitle}
        footer={
          showCover && previewUid !== value.cover &&
          <div style={{ display: "flex", flex: 1, justifyContent: "center" }}>
            <Button onClick={handleSetCover} type="primary" style={{ margin: "auto" }}>{coverProps.buttonName}</Button>
          </div>
        }
        onCancel={() => setPreviewModalVisible(false)}
      >
        <PreviewModalBodyContainer>
          <img alt="example" style={{ width: '100%', height: "100%", objectFit: "cover" }} src={previewImage} />
          {
            showCover && previewUid === value.cover && <ModalCoverContainer bgColor={coverProps.bgColor}>{coverProps.coverName}</ModalCoverContainer>
          }
        </PreviewModalBodyContainer>
      </Modal>
    </Container>
  )
};

// 处理上传图片
export const handleUpload = ({ file, onError, onSuccess }) => {
  return AdminApi.uploadPhoto(file).then(async (res) => {
    if (res) {
      onSuccess(res, file);
    } else {
      onError('上传失败')
    }
  })
};

// 图片上传校验
export const beforeUpload = (file, limits): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (limits) {
      const currentType = file.type.split('/')[1];
      if (!limits.types.some(item => item === currentType)) {
        message.error("仅支持:" + limits.types.join("，") + "; 格式");
        return reject();
      }
      if (file.size > limits.size) {
        message.error("单张图片最大:" + Tools.unitConversion(limits.size));
        return reject();
      }
    }
    return resolve();
  });
};
/**
 * 上传图片按钮
 */
const uploadButton = (
  <div>
    <PlusOutlined />
    <div className="ant-upload-text">上传图片</div>
  </div>
);


interface ModalCoverContainerProps {
  bgColor?: string;
}

const Container = styled.div`
  .img-file-item {
    margin-right: 10px;
    padding: 8px;
    margin-bottom: 10px;
    width: 104px;
    height: 104px;
    border: 1px solid #d9d9d9;
    border-radius: 8px;
  &:hover {
    .img-hover {
      opacity: 1;
    }
  }
  .img-cover {
    position: absolute;
    width: 20%;
    bottom: 0px;
    display: flex;
    align-items: center;
    justify-content: center;
    left: 0px;
    width: 100%;
    font-size: 13px;
    background: ${style['theme-color']};
    color: #fff;
  }
  .img-wrap {
    width: 86px;
    height: 86px;
    position: relative;
  }
  .img-hover {
    opacity: 0;
    position: absolute;
    left: 0px;
    top: 0px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    padding: 8px;
    background-color: rgba(0, 0, 0, 0.5);
    transition: all 0.5s;
    .iconfont {
      color: #fff;
      font-size: 14px;
      cursor: pointer;
    }
    .iconeye {
      margin-right: 10px;
      position: relative;
    }
    /* .iconeye::after {
      position
    } */
  }
  .img-file {
    width: 100%;
    height: 100%;
    transition: all 1s;
  }
}
 .global-center {
   display: flex;
   align-items: center;
   flex-wrap:wrap;
 }
 .thumbnail-icon{
    color: white;
    fontSize: 16px;
    cursor: pointer;
    padding: 2px 5px;
 }
 .ant-upload-picture-card-wrapper{
    width: auto;
 }
`;

const UploadHintContainer = styled.div`
    margin: 0 0 20px;
    line-height: 24px;
    color: #999;
    font-size: 14px;
    text-align: left;
`
const PreviewModalBodyContainer = styled.div`
  position: relative; 
`

const ModalCoverContainer = styled.div`
  position: absolute;
  bottom: 0;
  height: 10%;
  width: 100%;
  background: ${(props: ModalCoverContainerProps) => props.bgColor};
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px; 
  color: white;
`

export default PictureUploader;
