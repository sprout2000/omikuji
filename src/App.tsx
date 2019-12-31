import React from 'react';
import ReactDOM from 'react-dom';

import localforage from 'localforage';
import ons from 'onsenui';
import {
  Page,
  Toolbar,
  ToolbarButton,
  Icon,
  Tab,
  Tabbar,
  Splitter,
  SplitterSide,
  SplitterContent,
} from 'react-onsenui';

import HistoryPage from './HistoryPage';
import HomePage from './HomePage';
import SideBar from './SideBar';
import ORACLES from './Oracles';

import 'onsenui/css/onsenui.min.css';
import 'onsenui/css/onsen-css-components.min.css';
import './App.css';

interface Score {
  createdAt: string;
  fortune: string;
  id: number;
  oracle: string;
}

interface State {
  title: string;
  scores: Score[];
  index: number;
  imgNum: number;
  cName: string;
  oracle: string;
  disable: boolean;
  drawerOpen: boolean;
  count: number;
}

interface Props {
  title: string;
  scores: Score[];
  index: number;
  imgNum: number;
  cName: string;
  oracle: string;
  disable: boolean;
  drawerOpen: boolean;
  count: number;
}

const FORTUNES = ['大吉', '吉', '中吉', '小吉', '末吉', '凶', '大凶'];
const TITLES = ['おみくじ', '履歴'];

class App extends React.Component {
  public state: State = {
    title: 'おみくじ',
    scores: [],
    index: 0,
    imgNum: 0,
    cName: 'App-logo',
    oracle: 'おみくじボタンをタップ！',
    disable: false,
    drawerOpen: false,
    count: 0,
  };

  public componentDidMount(): void {
    localforage
      .getItem('omikuji-20190501')
      .then((value: unknown): void => {
        if (!value) {
          this.setState({ scores: [] });
        } else {
          this.setState({ scores: value });
        }
      })
      .catch((err: Error): void => {
        console.error(err);
      });
  }

  public componentDidUpdate(_prevProps: Props, prevState: State): void {
    if (this.state.scores !== prevState.scores) {
      localforage
        .setItem('omikuji-20190501', this.state.scores)
        .catch((err): void => {
          console.error(err);
        });
    }
  }

  public renderToolbar = (): JSX.Element => (
    <Toolbar>
      <div className="left">
        <ToolbarButton onClick={this.toggleDrawer}>
          <Icon icon="md-menu" />
        </ToolbarButton>
      </div>
      <div className="center">{this.state.title}</div>
    </Toolbar>
  );

  private renderTabs = (): { content: JSX.Element; tab: JSX.Element }[] => {
    return [
      {
        content: (
          <HomePage
            key="Home"
            omikuji={this.handleOnClick}
            imgNum={this.state.imgNum}
            cName={this.state.cName}
            oracle={this.state.oracle}
            disable={this.state.disable}
          />
        ),
        tab: <Tab key="Home" label="おみくじ" icon="md-home" />,
      },
      {
        content: <HistoryPage key="settings" scores={this.state.scores} />,
        tab: <Tab key="settings" label="履歴" icon="md-time" />,
      },
    ];
  };

  private increment = (): void => {
    this.setState((prev: State): { count: number } => {
      return {
        count: prev.count + 1,
      };
    });
  };

  private onReload = (): void => {
    window.location.reload();
  };
  private openDrawer = (): void => {
    this.setState({ drawerOpen: true });
  };
  private closeDrawer = (): void => {
    this.setState({ drawerOpen: false });
  };
  private toggleDrawer = (): void => {
    this.setState({ drawerOpen: !this.state.drawerOpen });
  };

  private handleOnConfirm = (): void => {
    ons.notification.confirm({
      title: '(´･ω･`)',
      message: '本当に消しちゃうの？',
      buttonLabels: ['いいえ', 'はい'],
      cancelable: true,
      callback: (index: number): void => {
        if (index === 1) {
          this.onDeleteHistory();
        }
      },
    });
    this.closeDrawer();
  };

  private onDeleteHistory = (): void => {
    this.setState({
      imgNum: 0,
      cName: 'App-logo',
      oracle: 'おみくじボタンをタップ！',
      scores: [],
      count: 0,
    });
    localforage
      .setItem('omikuji-20190501', this.state.scores)
      .catch((err): void => {
        console.error(err);
      });
    this.closeDrawer();
  };

  private handleOnClick = (): void => {
    if (this.state.count > 2) {
      ons.notification.alert({
        title: '(´･ω･`)',
        message: '一度に三回までしか引けないよ…',
        buttonLabel: 'OK',
        cancelable: true,
      });
    } else {
      this.increment();
      this.setState({
        imgNum: 0,
        cName: 'Running',
        disable: !this.state.disable,
      });
      const fortune = Math.floor(Math.random() * FORTUNES.length);
      const oracle = Math.floor(Math.random() * ORACLES[fortune].length);
      const newItem = {
        fortune: FORTUNES[fortune],
        createdAt: new Date().toLocaleString(),
        id: new Date().getTime(),
        oracle: ORACLES[fortune][oracle],
      };
      setTimeout((): void => {
        this.setState({
          scores: [newItem, ...this.state.scores],
          imgNum: fortune + 1,
          cName: 'fortune',
          oracle: newItem.oracle,
          disable: !this.state.disable,
        });
      }, 800);
    }
  };

  public render(): JSX.Element {
    return (
      <Page renderToolbar={this.renderToolbar}>
        <Splitter>
          <SplitterSide
            side="left"
            width={250}
            collapse={true}
            swipeable={true}
            isOpen={this.state.drawerOpen}
            onClose={this.closeDrawer}
            onOpen={this.openDrawer}>
            <SideBar
              onReload={this.onReload}
              onConfirm={this.handleOnConfirm}
              onDelete={this.onDeleteHistory}
            />
          </SplitterSide>
          <SplitterContent>
            <Tabbar
              renderTabs={this.renderTabs}
              // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
              // @ts-ignore
              onPreChange={({ index }): void =>
                this.setState({
                  index: index,
                  title: TITLES[index],
                })
              }
              index={this.state.index}
              swipeable
            />
          </SplitterContent>
        </Splitter>
      </Page>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));

if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
  window.addEventListener('load', (): void => {
    navigator.serviceWorker.register('./service-worker.js');
  });
}

if (ons.platform.isIPhoneX()) {
  document.documentElement.setAttribute('onsflag-iphonex-portrait', '');
}
