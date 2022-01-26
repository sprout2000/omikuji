import { Page, Button, Card, Icon } from 'react-onsenui';

type Props = {
  cName: string;
  oracle: string;
  imgNum: number;
  disable: boolean;
  onClick: (e?: React.MouseEvent<HTMLElement>) => void;
};

import Omikuji from '../images/omikuji.png';
import Daikichi from '../images/daikichi.png';
import Kichi from '../images/kichi.png';
import Chuukichi from '../images/chuukichi.png';
import Syoukichi from '../images/syoukichi.png';
import Suekichi from '../images/suekichi.png';
import Kyou from '../images/kyou.png';
import Daikyou from '../images/daikyou.png';

const IMAGES = [
  Omikuji,
  Daikichi,
  Kichi,
  Chuukichi,
  Syoukichi,
  Suekichi,
  Kyou,
  Daikyou,
];

export const HomePage = (props: Props) => (
  <Page>
    <div className="container">
      <div className="omikuji-container">
        <img src={IMAGES[props.imgNum]} alt="logo" className={props.cName} />
      </div>
      <div className="button-container">
        <Button onClick={props.onClick} disabled={props.disable ? true : false}>
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
