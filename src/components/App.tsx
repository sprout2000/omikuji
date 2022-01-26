import React from 'react';
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
import ons from 'onsenui';
import localforage from 'localforage';

import { SideBar } from './SideBar';
import { HomePage } from './HomePage';
import { HistoryPage } from './HistoryPage';

import { oracles } from '../lib/oracles';
import { isScores } from '../lib/isScores';

import './App.css';

type Props = {
  title: string;
  scores: Score[];
  index: number;
  imgNum: number;
  cName: string;
  oracle: string;
  disable: boolean;
  drawerOpen: boolean;
  count: number;
};

const FORTUNES = ['大吉', '吉', '中吉', '小吉', '末吉', '凶', '大凶'];
const TITLES = ['ホーム', '履歴'];

export class App extends React.Component {
  public state: State = {
    title: 'ホーム',
    scores: [],
    index: 0,
    imgNum: 0,
    cName: 'App-logo',
    oracle: 'おみくじボタンをタップ！',
    disable: false,
    drawerOpen: false,
    count: 0,
  };

  public componentDidMount() {
    localforage
      .getItem('omikuji-20200801')
      .then((value) => isScores(value) && this.setState({ scores: value }))
      .catch((err) => console.error(err));
  }

  public componentDidUpdate(_prevProps: Props, prevState: State) {
    if (this.state.scores !== prevState.scores) {
      localforage
        .setItem('omikuji-20200801', this.state.scores)
        .catch((err) => console.error(err));
    }
  }

  private renderToolbar = () => (
    <Toolbar>
      <div className="left">
        <ToolbarButton onClick={this.onToggleDrawer}>
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
            onClick={this.onClick}
            imgNum={this.state.imgNum}
            cName={this.state.cName}
            oracle={this.state.oracle}
            disable={this.state.disable}
          />
        ),
        tab: <Tab key="Home" label="ホーム" icon="md-home" />,
      },
      {
        content: <HistoryPage key="settings" scores={this.state.scores} />,
        tab: <Tab key="settings" label="履歴" icon="md-time" />,
      },
    ];
  };

  private increment = () => {
    this.setState((prev: State): { count: number } => {
      return {
        count: prev.count + 1,
      };
    });
  };

  private onReload = () => {
    window.location.reload();
  };

  private onOpenDrawer = () => {
    this.setState({ drawerOpen: true });
  };

  private onCloseDrawer = () => {
    this.setState({ drawerOpen: false });
  };

  private onToggleDrawer = () => {
    this.setState({ drawerOpen: !this.state.drawerOpen });
  };

  private onDeleteHistory = () => {
    this.setState({
      imgNum: 0,
      cName: 'App-logo',
      oracle: 'おみくじボタンをタップ！',
      scores: [],
      count: 0,
    });

    localforage
      .setItem('omikuji-20190501', this.state.scores)
      .catch((err) => console.error(err));

    this.onCloseDrawer();
  };

  private onConfirm = () => {
    ons.notification.confirm({
      title: '(´･ω･`)',
      message: '本当に消しちゃうの？',
      buttonLabels: ['いいえ', 'はい'],
      cancelable: true,
      callback: (index: number) => {
        if (index === 1) this.onDeleteHistory();
      },
    });

    this.onCloseDrawer();
  };

  private onClick = () => {
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
      const oracle = Math.floor(Math.random() * oracles[fortune].length);

      const newItem = {
        fortune: FORTUNES[fortune],
        createdAt: new Date().toLocaleString(),
        id: new Date().getTime(),
        oracle: oracles[fortune][oracle],
      };

      setTimeout(() => {
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

  public render() {
    return (
      <Page renderToolbar={this.renderToolbar}>
        <Splitter>
          <SplitterSide
            side="left"
            width={250}
            collapse={true}
            swipeable={true}
            isOpen={this.state.drawerOpen}
            onClose={this.onCloseDrawer}
            onOpen={this.onOpenDrawer}
          >
            <SideBar onReload={this.onReload} onConfirm={this.onConfirm} />
          </SplitterSide>
          <SplitterContent>
            <Tabbar
              renderTabs={this.renderTabs}
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              onPreChange={({ index }) =>
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
