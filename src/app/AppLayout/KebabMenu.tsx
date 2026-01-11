import React from 'react';
import { Fragment, cloneElement, useRef, useState } from 'react';
import {
  Avatar,
  Button,
  ButtonVariant,
  Divider,
  Dropdown,
  DropdownGroup,
  DropdownItem,
  DropdownList,
  Menu,
  MenuContent,
  MenuGroup,
  MenuItem,
  MenuList,
  MenuSearchInput,
  MenuToggle,
  MenuToggleElement,
  NotificationBadge,
  NotificationBadgeVariant,
  Popper,
  SearchInput,
  Toolbar,
  ToolbarContent,
  ToolbarGroup,
  ToolbarItem,
  Tooltip,
} from '@patternfly/react-core';
import EllipsisVIcon from '@patternfly/react-icons/dist/esm/icons/ellipsis-v-icon';
import CogIcon from '@patternfly/react-icons/dist/esm/icons/cog-icon';
import HelpIcon from '@patternfly/react-icons/dist/esm/icons/help-icon';
import ThIcon from '@patternfly/react-icons/dist/esm/icons/th-icon';
import QuestionCircleIcon from '@patternfly/react-icons/dist/esm/icons/question-circle-icon';
import { NavLink } from 'react-router-dom';
const imgAvatar =
  'https://github.com/patternfly/patternfly-react/raw/main/packages/react-core/src/demos/@patternfly/react-core/src/components/assets/avatarImg.svg';
const pfIcon =
  'https://github.com/patternfly/patternfly-react/raw/main/packages/react-core/src/demos/@patternfly/react-core/src/demos/assets/pf-logo-small.svg';
//const pfLogo =  'https://github.com/patternfly/patternfly-react/raw/main/packages/react-core/src/demos/@patternfly/react-core/src/demos/assets/PF-HorizontalLogo-Color.svg';

//import EditIcon from '@patternfly/react-icons/dist/esm/icons/edit-icon';
//import CloneIcon from '@patternfly/react-icons/dist/esm/icons/clone-icon';
//import TrashIcon from '@patternfly/react-icons/dist/esm/icons/trash-icon';

export const KebabDropdownWithIconsV6: React.FunctionComponent = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isKebabDropdownOpen, setIsKebabDropdownOpen] = useState(false);
  const [isOpen, setIsOpen] = React.useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const [refFullOptions, setRefFullOptions] = useState<Element[]>();
  const [favorites, setFavorites] = useState<string[]>([]);
  const [filteredIds, setFilteredIds] = useState<string[]>(['*']);
  const [searchValue, setSearchValue] = useState('');
  const toggleRef = useRef<HTMLButtonElement>(null);
  //const onToggle = () => setIsOpen((prev) => !prev);
  //const onSelect = () => setIsOpen(false);
  const [isFullKebabDropdownOpen, setIsFullKebabDropdownOpen] = useState(false);

  const onDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const onDropdownSelect = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const onKebabDropdownToggle = () => {
    setIsKebabDropdownOpen(!isKebabDropdownOpen);
  };

  const onKebabDropdownSelect = () => {
    setIsKebabDropdownOpen(!isKebabDropdownOpen);
  };

  const onFullKebabDropdownToggle = () => {
    setIsFullKebabDropdownOpen(!isFullKebabDropdownOpen);
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onFavorite = (event: any, itemId: string, actionId: string) => {
    event.stopPropagation();
    if (actionId === 'fav') {
      const isFavorite = favorites.includes(itemId);
      if (isFavorite) {
        setFavorites(favorites.filter((fav) => fav !== itemId));
      } else {
        setFavorites([...favorites, itemId]);
      }
    }
  };
  const menuItems = [
    <MenuGroup key="group1" label="Group 1">
      <MenuList>
        <MenuItem itemId="0" id="0" isFavorited={favorites.includes('0')}>
          Application 1
        </MenuItem>
        <MenuItem
          itemId="1"
          id="1"
          isFavorited={favorites.includes('1')}
          to="#default-link2"
          onClick={(ev) => ev.preventDefault()}
        >
          Application 2
        </MenuItem>
      </MenuList>
    </MenuGroup>,
    <Divider key="group1-divider" />,
    <MenuGroup key="group2" label="Group 2">
      <MenuList>
        <MenuItem
          itemId="2"
          id="2"
          isFavorited={favorites.includes('2')}
          to="#default-link3"
          onClick={(ev) => ev.preventDefault()}
        >
          Application 3
        </MenuItem>
        <MenuItem
          itemId="3"
          id="3"
          isFavorited={favorites.includes('3')}
          isExternalLink
          icon={<img src={pfIcon} />}
          to="#default-link4"
          onClick={(ev) => ev.preventDefault()}
        >
          Application 4 with icon
        </MenuItem>
      </MenuList>
    </MenuGroup>,
    <Divider key="group2-divider" />,
    <MenuList key="other-items">
      <MenuItem key="tooltip-app" isFavorited={favorites.includes('4')} itemId="4" id="4">
        <Tooltip content={<div>Launch Application 4</div>} position="right">
          <span>Application 4 with tooltip</span>
        </Tooltip>
      </MenuItem>
      <MenuItem key="disabled-app" itemId="5" id="5" isDisabled>
        Unavailable Application
      </MenuItem>
    </MenuList>,
  ];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const filterItems = (items: any[], filteredIds: string[]) => {
    if (filteredIds.length === 1 && filteredIds[0] === '*') {
      return items;
    }
    let keepDivider = false;
    const filteredCopy = items
      .map((group) => {
        if (group.type === MenuGroup) {
          const filteredGroup = cloneElement(group, {
            children: cloneElement(group.props.children, {
              children: group.props.children.props.children.filter((child) => {
                if (filteredIds.includes(child.props.itemId)) {
                  return child;
                }
              }),
            }),
          });
          const filteredList = filteredGroup.props.children;
          if (filteredList.props.children.length > 0) {
            keepDivider = true;
            return filteredGroup;
          } else {
            keepDivider = false;
          }
        } else if (group.type === MenuList) {
          const filteredGroup = cloneElement(group, {
            children: group.props.children.filter((child) => {
              if (filteredIds.includes(child.props.itemId)) {
                return child;
              }
            }),
          });
          if (filteredGroup.props.children.length > 0) {
            keepDivider = true;
            return filteredGroup;
          } else {
            keepDivider = false;
          }
        } else {
          if ((keepDivider && group.type === Divider) || filteredIds.includes(group.props.itemId)) {
            return group;
          }
        }
      })
      .filter((newGroup) => newGroup);

    if (filteredCopy.length > 0) {
      const lastGroup = filteredCopy.pop();
      if (lastGroup.type !== Divider) {
        filteredCopy.push(lastGroup);
      }
    }

    return filteredCopy;
  };
  const createFavorites = (favIds: string[]) => {
    const favorites: unknown[] = [];

    menuItems.forEach((item) => {
      if (item.type === MenuList) {
        item.props.children.filter((child) => {
          if (favIds.includes(child.props.itemId)) {
            favorites.push(child);
          }
        });
      } else if (item.type === MenuGroup) {
        item.props.children.props.children.filter((child) => {
          if (favIds.includes(child.props.itemId)) {
            favorites.push(child);
          }
        });
      } else {
        if (favIds.includes(item.props.itemId)) {
          favorites.push(item);
        }
      }
    });

    return favorites;
  };
  const filteredFavorites = filterItems(createFavorites(favorites), filteredIds);
  const filteredItems = filterItems(menuItems, filteredIds);
  if (filteredItems.length === 0) {
    filteredItems.push(<MenuItem key="no-items">No results found</MenuItem>);
  }

  const onFullKebabDropdownSelect = () => {
    setIsFullKebabDropdownOpen(!isFullKebabDropdownOpen);
  };
  const onToggleClick = (ev: React.MouseEvent) => {
    ev.stopPropagation(); // Stop handleClickOutside from handling
    setTimeout(() => {
      if (menuRef.current) {
        //const firstElement = menuRef.current.querySelector(
        //  'li > button:not(:disabled), li > a:not(:disabled), input:not(:disabled)',
        //);
        // firstElement && (firstElement as HTMLElement).focus();
        setRefFullOptions(Array.from(menuRef.current.querySelectorAll('li:not(li[role=separator])>*:first-child')));
      }
    }, 0);
    setIsOpen(!isOpen);
  };
  const kebabDropdownItems = (
    <>
      <DropdownItem key="settings">
        <CogIcon /> Settings
      </DropdownItem>
      <DropdownItem key="help">
        <HelpIcon /> Help
      </DropdownItem>
    </>
  );
  const onTextChange = (textValue: string) => {
    setSearchValue(textValue);
    if (textValue === '') {
      setFilteredIds(['*']);
      return;
    }

    const filteredIds =
      refFullOptions
        ?.filter((item) => (item as HTMLElement).innerText.toLowerCase().includes(textValue.toString().toLowerCase()))
        .map((item) => item.id) || [];
    setFilteredIds(filteredIds);
  };
  const menu = (
    // eslint-disable-next-line no-console
    <Menu ref={menuRef} onActionClick={onFavorite} onSelect={(_ev, itemId) => console.log('selected', itemId)}>
      <MenuSearchInput>
        <SearchInput
          aria-label="Filter menu items"
          value={searchValue}
          onChange={(_event, value) => onTextChange(value)}
          onClear={(event) => {
            event.stopPropagation();
            onTextChange('');
          }}
        />
      </MenuSearchInput>
      <Divider />
      <MenuContent>
        {filteredFavorites.length > 0 && (
          <Fragment>
            <MenuGroup key="favorites-group" label="Favorites">
              <MenuList>{filteredFavorites}</MenuList>
            </MenuGroup>
            <Divider key="favorites-divider" />
          </Fragment>
        )}
        {filteredItems}
      </MenuContent>
    </Menu>
  );
  const toggle = (
    <MenuToggle
      aria-label="Toggle"
      ref={toggleRef}
      variant="plain"
      onClick={onToggleClick}
      isExpanded={isOpen}
      style={{ width: 'auto' }}
      icon={<ThIcon />}
    />
  );
  const userDropdownItems = [
    <>
      <DropdownItem key="group 2 profile">My profile</DropdownItem>
      <DropdownItem key="group 2 user">User management</DropdownItem>
      <DropdownItem key="group 2 signout">
        <NavLink
          to="http://localhost:8080/realms/attikas/protocol/openid-connect/logout"
          style={{ marginLeft: '12px' }}
        >
          Sign out
        </NavLink>
      </DropdownItem>
    </>,
  ];

  const headerToolbar = (
    <Toolbar id="toolbar" isStatic>
      <ToolbarContent>
        <ToolbarGroup
          variant="action-group-plain"
          align={{ default: 'alignEnd' }}
          gap={{ default: 'gapNone', md: 'gapMd' }}
        >
          <ToolbarItem>
            <NotificationBadge aria-label="Notifications" variant={NotificationBadgeVariant.read} onClick={() => {}} />
          </ToolbarItem>
          <ToolbarGroup variant="action-group-plain" visibility={{ default: 'hidden', lg: 'visible' }}>
            <ToolbarItem visibility={{ default: 'hidden', md: 'hidden', lg: 'visible' }}>
              <Popper trigger={toggle} triggerRef={toggleRef} popper={menu} popperRef={menuRef} isVisible={isOpen} />
            </ToolbarItem>
            <ToolbarItem>
              <Button aria-label="Settings" isSettings variant="plain" />
            </ToolbarItem>
            <ToolbarItem>
              <Button aria-label="Help" variant={ButtonVariant.plain} icon={<QuestionCircleIcon />} />
            </ToolbarItem>
          </ToolbarGroup>
          <ToolbarItem visibility={{ default: 'hidden', md: 'visible', lg: 'hidden' }}>
            <Dropdown
              isOpen={isKebabDropdownOpen}
              onSelect={onKebabDropdownSelect}
              onOpenChange={(isOpen: boolean) => setIsKebabDropdownOpen(isOpen)}
              popperProps={{ position: 'right' }}
              toggle={(toggleRef: React.Ref<MenuToggleElement>) => (
                <MenuToggle
                  ref={toggleRef}
                  onClick={onKebabDropdownToggle}
                  isExpanded={isKebabDropdownOpen}
                  variant="plain"
                  aria-label="Settings and help"
                  icon={<EllipsisVIcon />}
                />
              )}
            >
              <DropdownList>{kebabDropdownItems}</DropdownList>
            </Dropdown>
          </ToolbarItem>
          <ToolbarItem visibility={{ md: 'hidden' }}>
            <Dropdown
              isOpen={isFullKebabDropdownOpen}
              onSelect={onFullKebabDropdownSelect}
              onOpenChange={(isOpen: boolean) => setIsFullKebabDropdownOpen(isOpen)}
              popperProps={{ position: 'right' }}
              toggle={(toggleRef: React.Ref<MenuToggleElement>) => (
                <MenuToggle
                  ref={toggleRef}
                  onClick={onFullKebabDropdownToggle}
                  isExpanded={isFullKebabDropdownOpen}
                  variant="plain"
                  aria-label="Toolbar menu"
                  icon={<EllipsisVIcon />}
                />
              )}
            >
              <DropdownGroup key="group 2" aria-label="User actions">
                <DropdownList>{userDropdownItems}</DropdownList>
              </DropdownGroup>
              <Divider />
              <DropdownList>{kebabDropdownItems}</DropdownList>
            </Dropdown>
          </ToolbarItem>
        </ToolbarGroup>
        <ToolbarItem visibility={{ default: 'hidden', md: 'visible' }}>
          <Dropdown
            isOpen={isDropdownOpen}
            onSelect={onDropdownSelect}
            onOpenChange={(isOpen: boolean) => setIsDropdownOpen(isOpen)}
            popperProps={{ position: 'right' }}
            toggle={(toggleRef: React.Ref<MenuToggleElement>) => (
              <MenuToggle
                ref={toggleRef}
                onClick={onDropdownToggle}
                isExpanded={isDropdownOpen}
                icon={<Avatar src={imgAvatar} alt="" size="sm" />}
              >
                Evan
              </MenuToggle>
            )}
          >
            <DropdownList>{userDropdownItems}</DropdownList>
          </Dropdown>
        </ToolbarItem>
      </ToolbarContent>
    </Toolbar>
  );
  return headerToolbar;
};
