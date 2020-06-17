/* eslint-disable prefer-object-spread */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable no-useless-constructor */

// @ts-nocheck

// import * as fs from 'fs';

import {
  parse as parseToTree,
  TSESTreeOptions,
  AST,
} from '@typescript-eslint/typescript-estree';

import Traverser from 'eslint/lib/shared/traverser';

const tsxData = `
import React from 'react';
import { Grid } from 'semantic-ui-react';
import moment from 'moment-timezone';

import HeaderCompTabletMarkup from '../HeaderCompTabletMarkup';
import HeaderMobileMarkup from '../HeaderMobileMarkup';

import setOperatingTimeType from '../../utils/setOperatingTimeType.helper';

import styles from './Header.module.scss';

import logoImage from './assets/images/logo.png';

moment.tz.setDefault('Europe/Moscow');
moment.locale('ru');

interface IHeaderProps {
  authData: any;
}

class Header extends React.Component<IHeaderProps> {
  public interval: any = null;

  state = {
    currentTime: moment(),
  };

  componentDidMount() {
    this.interval = setInterval(() => {
      this.setState({ currentTime: moment() });
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    const { authData } = this.props;
    const { user } = authData;
    const { lastName, name, surName, division, position, sex } = user;
    const { currentTime } = this.state;
    const date = currentTime.format('DD.MM.YY');
    const time = currentTime.format('HH:mm');
    const operatingTimeType = setOperatingTimeType(currentTime);

    return (
      <Grid className={styles.noHorizontalMarginsForMobile}>
        {/* Только ПК и планшеты */}
        <Grid.Row
          only="tablet computer"
          columns={3}
          style={{
            paddingTop: '6px',
            paddingBottom: '10px',
          }}
        >
          <HeaderCompTabletMarkup
            logoImage={logoImage}
            date={date}
            time={time}
            operatingTimeType={operatingTimeType}
            lastName={lastName}
            name={name}
            surName={surName}
            division={division}
            position={position}
            sex={sex}
          />
        </Grid.Row>

        {/* Только смартфоны */}
        <Grid.Row
          only="mobile"
          columns={3}
          style={{
            paddingTop: '6px',
            paddingBottom: '10px',
          }}
        >
          <HeaderMobileMarkup
            logoImage={logoImage}
            date={date}
            time={time}
            operatingTimeType={operatingTimeType}
            lastName={lastName}
            name={name}
            surName={surName}
            division={division}
            position={position}
            sex={sex}
          />
        </Grid.Row>
      </Grid>
    );
  }
}

export default Header;

`;

const parseSource = (
  source: string,
  options?: TSESTreeOptions,
): AST<TSESTreeOptions> => {
  try {
    const program = parseToTree(source, options);

    return program;
  } catch (error) {
    console.log(error);
    throw new Error('TS_PARSER_ERROR');
  }
};

const opts = {
  range: true,
  loc: false,
  tokens: false,
  comment: false,
  useJSXTextNode: false,
  jsx: true,
};
const fakeAst = parseSource(tsxData, opts);

// console.log(fakeAst);

const traverser = new Traverser();
// const fakeAst = {
//   type: 'Program',
//   body: [
//     {
//       type: 'ClassDeclaration',
//       id: {
//         type: 'Identifier',
//       },
//       superClass: null,
//       body: {
//         type: 'ClassBody',
//         body: [],
//       },
//       experimentalDecorators: [
//         {
//           type: 'Decorator',
//           expression: {},
//         },
//       ],
//     },
//   ],
// };

// fakeAst.body[0].parent = fakeAst;

const visited = [];

// with 'visitorKeys' option to traverse decorators.
traverser.traverse(fakeAst, {
  enter: (node: any) => {
    if (node.type === 'JSXAttribute') {
      const { name } = node;
      const { type, name: innerName } = name;

      if (type === 'JSXIdentifier' && innerName === 'className') {
        // TODO: Собрать информаци об использованном внутри классе.
        // IDEA: Обязательно нужно учесть использование classnames

        // JSXExpressionContainer"
        // "MemberExpression"
        // "Identifier"
        // "styles"
        // "Identifier"
        // "noHorizontalMarginsForMobile"
        // false

        console.log('NODE JSXElement=', node);
      }
    }

    visited.push(node.type);
  },
  visitorKeys: Object.assign({}, Traverser.DEFAULT_VISITOR_KEYS, {
    ClassDeclaration: Traverser.DEFAULT_VISITOR_KEYS.ClassDeclaration.concat([
      'experimentalDecorators',
    ]),
  }),
});

// console.log('visited=', visited);

export default parseSource;
