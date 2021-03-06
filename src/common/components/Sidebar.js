import React from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { formValueSelector } from 'redux-form';

const selector = formValueSelector('wizard');

const mapStateToProps = state => ({
  platform: selector(state, 'platform'),
  step: state.wizard.step,
});

const Sidebar = ({ step, platform }) => (
  <nav className="site__sidebar sidebar">
    <ul className="sidebar__list">
      <li className={classnames('sidebar__item', step === 1 ? 'sidebar__item--active' : null)}>
        <span>Project meta</span>
      </li>
      <li className={classnames('sidebar__item', step === 2 ? 'sidebar__item--active' : null)}>
        <span>SA-MP server</span>
      </li>
      <li className={classnames(
        'sidebar__item',
        step === 3 ? 'sidebar__item--active' : null,
        platform !== 'windows' ? 'sidebar__item--disabled' : null,
      )}
      >
        <span>Compiler</span>
      </li>
      <li className={classnames(
        'sidebar__item',
        step === 4 ? 'sidebar__item--active' : null,
        platform !== 'windows' ? 'sidebar__item--disabled' : null,
      )}
      >
        <span>Includes</span>
      </li>
      <li className={classnames('sidebar__item', step === 5 ? 'sidebar__item--active' : null)}>
        <span>Plugins</span>
      </li>
      <li className={classnames('sidebar__item', step === 6 ? 'sidebar__item--active' : null)}>
        <span>Confirmation</span>
      </li>
      <li className={classnames('sidebar__item', step === 7 ? 'sidebar__item--active' : null)}>
        <span>Processing</span>
      </li>
      <li className={classnames('sidebar__item', step === 8 ? 'sidebar__item--active' : null)}>
        <span>Finished</span>
      </li>
    </ul>
  </nav>
);

export default connect(mapStateToProps)(Sidebar);
