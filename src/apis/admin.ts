import request from '@/utils/request';

const base = '/dev';
/**
 * 地区与地铁接口
 */
const AdminApi = {
    uploadPhoto(file: Blob){
        const form = new FormData();
        form.append('file', file);
        return request({
            url: `${base}/admin/house/upload/photo`,
            method: 'post',
            data: form
        });
    },
    addHouse(houseForm){
        return request({
            url: `${base}/admin/house/add`,
            method: 'post',
            data: houseForm
        });
    }
}

export default AdminApi;
