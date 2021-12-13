import { Page, List, ListItem, Icon } from 'react-onsenui';

import pjson from '../../package.json';

type Props = {
  onReload: () => void;
  onConfirm: () => void;
};

export const SideBar = (props: Props) => (
  <Page>
    <List className="drawer">
      <div className="drawer-header">
        <p>おみくじ</p>
        <p>v{pjson.version}</p>
      </div>
      <ListItem tappable onClick={props.onReload}>
        <div className="left">
          <Icon icon="md-refresh" style={{ color: '#007aff' }} size={24} />
        </div>
        <div className="center sidebar-text">リセットする</div>
      </ListItem>
      <ListItem tappable onClick={props.onConfirm}>
        <div className="left">
          <Icon icon="md-delete" style={{ color: '#e91e63' }} size={24} />
        </div>
        <div className="center sidebar-text">履歴を消去</div>
      </ListItem>
      <ListItem tappable>
        <div className="left">
          <Icon icon="md-info" style={{ color: '#999' }} size={24} />
        </div>
        <div className="center sidebar-text">
          <a
            rel="noreferrer"
            target="_blank"
            href="https://github.com/sprout2000/omikuji#readme"
          >
            サポートURL
          </a>
        </div>
      </ListItem>
    </List>
  </Page>
);
