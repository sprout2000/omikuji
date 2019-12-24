import React from 'react';

import { Page, Button, Card, Icon } from 'react-onsenui';

import spinner from './img/omikuji.png';
import chuukichi from './img/chuukichi.png';
import daikichi from './img/daikichi.png';
import daikyou from './img/daikyou.png';
import kichi from './img/kichi.png';
import kyou from './img/kyou.png';
import suekichi from './img/suekichi.png';
import syoukichi from './img/syoukichi.png';

interface Props {
  omikuji: (e?: React.MouseEvent<HTMLElement>) => void;
  imgNum: number;
  cName: string;
  oracle: string;
  disable: boolean;
}

const IMAGES = [
  spinner,
  daikichi,
  kichi,
  chuukichi,
  syoukichi,
  suekichi,
  kyou,
  daikyou,
];

const HomePage = (props: Props): JSX.Element => (
  <Page>
    <div className="container">
      <div className="omikuji-container">
        <img src={IMAGES[props.imgNum]} alt="logo" className={props.cName} />
      </div>
      <div className="button-container">
        <Button onClick={props.omikuji} disabled={props.disable ? true : false}>
          <Icon icon="fa-tags" style={{ marginRight: 5 }} />
          おみくじ
        </Button>
      </div>
      <div className="card-container">
        <Card>
          <div className="card-header">
            <Icon
              icon="md-face"
              size={24}
              style={{ color: '#e91e63', marginRight: 10 }}
            />
            きょうの占い
          </div>
          <div className="card-content">
            <p>{props.oracle}</p>
          </div>
        </Card>
      </div>
    </div>
  </Page>
);

export default HomePage;
