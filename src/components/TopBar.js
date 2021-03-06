import React from 'react'
import { Link, useLocation } from 'react-router-dom'

import {
  Menu,
  Container
} from 'semantic-ui-react'

import AccountAction from './AccountAction'

const menuItemStyle = {
  alignSelf: 'center'
}

const TopBar = () => {
  const { pathname } = useLocation()
  return (
    <Menu
      size='large'
      secondary
      pointing
      style={{ border: 'none' }}
    >
      <Container>
        <Menu.Item header as={Link} to='/'style={menuItemStyle} active={pathname === '/'}>Hexskell<sup>Beta</sup></Menu.Item>
        <Menu.Item as={Link} to='/bots' style={menuItemStyle} active={pathname === '/bots'}>Bots</Menu.Item>
        <Menu.Item as={Link} to='/practice-match' style={menuItemStyle} active={pathname === '/practice-match'}>Test</Menu.Item>
        <Menu.Item position='right'>
          <AccountAction />
        </Menu.Item>
      </Container>
    </Menu>
  )
}

export default TopBar
