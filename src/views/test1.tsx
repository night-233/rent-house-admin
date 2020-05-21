import React, { useRef, useState } from 'react';
import styled from 'styled-components'
function Test1 (props) {
  const door = useRef<HTMLDivElement>(null)
  const light = useRef<HTMLDivElement>(null)
  const doorBox = useRef<HTMLDivElement>(null)
  // let [percentDoor, setPercent] = useState(0)
  let percentDoor = 0
  let timer: any = ''
  const handleClick = () => {
    percentDoor++;
    // 门完全打开后，进入下一个画面
    if (percentDoor === 100) {
      doorBox.current?.classList.add('active')
      clearTimeout(timer)
      return;
    }
    // 角度变化
    door.current!.style!.transform = 'rotateY(' + (-90 * percentDoor / 100) + 'deg)'
    // 光线变化
    light.current!.style!.opacity = `${0.8 - 0.9 * percentDoor / 100}`;
    timer = setTimeout(handleClick, 16);
  }

  return (
    <Door>
      <div ref={doorBox} className={['door-box'].join(' ')}>
        <div className="wall">
          <div className="door-border">
            <div className="door-frame">
              <div ref={door} className="door">

                <div ref={light} className="light"></div>

                <div className="door-face-0"></div>

                <div className="door-face-2"></div>
                <div className="door-face-1">
                  <div className="door-card">我的书房</div>
                  <div className="door-btn">
                    <button className="door-in" onClick={handleClick}>进入{percentDoor}</button>
                  </div>
                </div>
                <div className="door-face-3"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Door>
  )
}


const Door = styled.div`

.door-box {
    max-width: 100%;
    width: 375px; 
    height: 628px;
    margin: 40px auto;
    background-color: #2a273c;
    font-family: STHeiTi, SimHei;
    overflow: hidden;
    position: relative;
    z-index: 1;
}
.door-box.active {
    animation: flyIntoRoom 1s both;
}
.door-box div {
    position: absolute;
}
.wall {
    left: 0; top: 0; right: 0; bottom: 46px;
    border-bottom: 3px solid #211820;
    background-color: #768bb6;
    max-height: calc(1.8 * (375px - 80px));
    margin: auto;
    box-shadow: 0 -200px #768bb6;
}
.door-border {
    top: 28px;
    left: 40px;
    right: 40px;
    bottom: 0;
    border: 3px solid #211820;
    border-radius: 2px 2px 0 0;
    border-bottom: 0;
    background-color: #183269;
}
.door-frame {
    top: 10px; left: 9px; right: 9px; bottom: 0;
    border: 3px solid #211820;
    border-radius: 2px 2px 0 0;
    border-bottom: 0;
    background-color: #fbfad0;
    -webkit-perspective: 1200px;
    perspective: 1200px;
}
.door {
    left: 0; top: 0; right: 0;  bottom: 0;
    -webkit-transform-style: preserve-3d;
    transform-style: preserve-3d;
    transform-origin: left;
    transform: rotateY(0deg);
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
}
.door-face-1,
.door-face-0 {
    left: -3px; top: -3px; right: -3px; bottom: -3px;
    border: 3px solid #211820;
    background-color: #295489;
}
.door-face-0 {
    transform: translateZ(-12px);
}
.door-face-1 {
    transform: translateZ(0);
}
.door-face-2 {
    height: 6px;
    left: -3px; right: -3px; top: 0;
    border: 3px solid #211820;
    border-radius: 2px;
    background-color: #0c2e59;
    transform: translate3D(0, -7.5px, -6px) rotateX(90deg);
}
.door-face-3 {
    width: 6px;
    top: -3px; right: 0; bottom: -3px;
    border: 3px solid #211820;
    border-radius: 2px;
    background-color: #0c2e59;
    transform: translate3D(7.5px, 0, -6px) rotateY(90deg);
}
/*光线*/
.light {
    left: 0; top: 0; bottom: 0;
    background: #F7E08F;
    width: 1000px;
    opacity: 0;
    transform: translateZ(-13px);
}
/*门牌*/
.door-card {
    width: 165px; height: 60px;
    line-height: 60px;
    background-color: #c1d0ec;
    top: 60px; left: 0; right: 0;
    margin: auto;
    text-align: center;
    font-size: 30px;
    border: 3px solid;
    border-radius: 2px;
}
.door-btn {
    left: 0; right: 0;
    text-align: center;
    margin-top: 140px;
    font-size: 24px;
    color: #9dbce3;
    line-height: 36px;
}
.door-in {
    width: 104px; height: 40px;
    border-radius: 40px;
    border: 2px solid;
    line-height: 40px;
    background-color: #eacc86;
    font-family: inherit; font-size: 24px;
    padding: 0; margin: 10px 0;
}
/* 动画 */
@keyframes flyIntoRoom {
    from {
        transform: scale(1) translateZ(0);
        opacity: 1;
    }
    to {
        transform: scale(2) translateZ(100px);
        opacity: 0;
    }
}
.room-img {
    position: absolute;
    width: 375px; max-width: 100%;
    left: 0; right: 0; top: 40px;
    margin: auto;
}
`

export default React.memo(Test1);