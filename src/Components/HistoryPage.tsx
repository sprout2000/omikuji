import { Page, List, ListItem } from 'react-onsenui';

type Props = {
  scores: Score[];
};

const fortuneStyle = (fortune: string): { color: string } => {
  switch (fortune) {
    case '大吉':
      return { color: '#cc0000' };
    case '吉':
      return { color: '#0088cc' };
    case '中吉':
      return { color: '#ff8000' };
    case '小吉':
      return { color: '#006600' };
    case '末吉':
      return { color: '#993300' };
    case '凶':
      return { color: '#8f00b3' };
    case '大凶':
      return { color: '#666666' };
    default:
      return { color: '#999999' };
  }
};

const HistoryPage = (props: Props) => (
  <Page>
    <div className="history-container">
      <List style={{ minWidth: '90vw', marginTop: 10 }}>
        <ListItem modifier="longdivider">
          <div className="left" style={{ color: '#666' }}>
            時間
          </div>
          <div className="center" style={{ color: '#666', marginLeft: '7em' }}>
            運勢
          </div>
        </ListItem>
        {props.scores.map((score) => {
          return (
            <ListItem
              key={score.id}
              style={fortuneStyle(score.fortune)}
              expandable
            >
              <div className="left">{score.createdAt}</div>
              <div className="center" style={{ marginLeft: '1em' }}>
                {score.fortune}
              </div>
              <div
                className="expandable-content"
                style={{ textAlign: 'center', color: '#666' }}
              >
                {score.oracle}
              </div>
            </ListItem>
          );
        })}
      </List>
    </div>
  </Page>
);

export default HistoryPage;
