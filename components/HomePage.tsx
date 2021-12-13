import { Page, Button, Card, Icon } from 'react-onsenui';

type Props = {
  cName: string;
  oracle: string;
  imgNum: number;
  disable: boolean;
  onClick: (e?: React.MouseEvent<HTMLElement>) => void;
};

const IMAGES = [
  'images/omikuji.png',
  'images/daikichi.png',
  'images/kichi.png',
  'images/chuukichi.png',
  'images/syoukichi.png',
  'images/suekichi.png',
  'images/kyou.png',
  'images/daikyou.png',
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
