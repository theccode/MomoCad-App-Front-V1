import React, {Component} from 'react';
import { Carousel } from 'antd';

import s01 from '../assets/s01.png'
import s02 from '../assets/s02.png'
import s03 from '../assets/s03.png'
import s04 from '../assets/s04.png'
import s05 from '../assets/s05.png'
import s06 from '../assets/s06.png'
import s07 from '../assets/s07.png'
import s08 from '../assets/s08.png'


export class Jumbotron extends Component{
    render(){
        return (
          <div className="parent container w-full mx-auto" style={{marginTop: '40px', padding: '0 0.5rem'}}>
            <Carousel autoplay>
              <div>
                <img src={s01} alt=""/>
              </div>
              <div>
                <img src={s02} alt=""/>
              </div>
              <div>
                <img src={s03} alt=""/>
              </div>
              <div>
                <img src={s04} alt=""/>
              </div>
              <div>
                <img src={s05} alt=""/>
              </div>
              <div>
                <img src={s06} alt=""/>
              </div>
              <div>
                <img src={s07} alt=""/>
              </div>
              <div>
                <img src={s08} alt=""/>
              </div>
            </Carousel>
          </div>
        )
    }
}