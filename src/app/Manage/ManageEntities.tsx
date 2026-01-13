import * as React from 'react';
import { Fragment, useState } from 'react';
import { Table, Tbody, Td, Th, Thead, Tr } from '@patternfly/react-table';
import {
  Button,
  Divider,
  MenuToggle,
  PageSection,
  Title,
  Toolbar,
  ToolbarContent,
  ToolbarGroup,
  ToolbarItem,
} from '@patternfly/react-core';
import EditIcon from '@patternfly/react-icons/dist/esm/icons/edit-icon';
import EllipsisVIcon from '@patternfly/react-icons/dist/esm/icons/ellipsis-v-icon';
import SyncIcon from '@patternfly/react-icons/dist/esm/icons/sync-icon';

interface Repository {
  name: string;
  displayName: string;
  clients: string;
  lastCommit: string;
}

export const ManageEntities: React.FunctionComponent = () => {
  // In real usage, this data would come from some external source like an API via props.
  const entities: Repository[] = [
    { name: 'Attikas Ltd', displayName: 'Attikas', clients: 'N', lastCommit: '10/01/2026 09:05' },
    { name: 'Dimi Ltd', displayName: 'Dimi clothes', clients: 'N', lastCommit: '08/01/2026 16:16' },
    { name: 'Kitrina PLC', displayName: 'Accounts kitrinismena', clients: 'Y', lastCommit: '09/01/2026 15:10' },
  ];

  const columnNames = {
    name: 'Entities',
    displayName: 'Display name',
    clients: 'Clients',
    lastCommit: 'Last Commit',
  };

  //const isRepoSelectable = (repo: Repository);  // => repo.name !== 'a'; // Arbitrary logic for this example

  const [selectedRepoName, setSelectedRepoName] = useState<string | null>(null);

  return (
    <PageSection hasBodyWrapper={false}>
      <Title headingLevel="h1" size="lg">
        Manage Entities
      </Title>

      <ToolbarGroups></ToolbarGroups>
      <Table aria-label="Selectable table">
        <Thead>
          <Tr>
            <Th screenReaderText="Row select" />
            <Th>{columnNames.name}</Th>
            <Th>{columnNames.displayName}</Th>
            <Th>{columnNames.clients}</Th>
            <Th>{columnNames.lastCommit}</Th>
          </Tr>
        </Thead>
        <Tbody>
          {entities.map((repo, rowIndex) => (
            <Tr key={repo.name}>
              <Td
                select={{
                  rowIndex,
                  onSelect: () => setSelectedRepoName(repo.name),
                  isSelected: selectedRepoName === repo.name,
                  //              isDisabled: !isRepoSelectable(repo),
                  variant: 'radio',
                }}
              />
              <Td dataLabel={columnNames.name}>{repo.name}</Td>
              <Td dataLabel={columnNames.displayName}>{repo.displayName}</Td>
              <Td dataLabel={columnNames.displayName}>{repo.clients}</Td>
              <Td dataLabel={columnNames.displayName}>{repo.lastCommit}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </PageSection>
  );
};

const ToolbarGroups: React.FunctionComponent = () => {
  const iconButtonGroupItems = (
    <Fragment>
      <ToolbarItem>
        <Button variant="plain" aria-label="edit" icon={<EditIcon />} />
      </ToolbarItem>
      <ToolbarItem>
        <Button variant="plain" aria-label="sync" icon={<SyncIcon />}>
          Refresh
        </Button>
      </ToolbarItem>
    </Fragment>
  );

  const buttonGroupItems = <Button variant="primary">Create Entity</Button>;

  const items = (
    <Fragment>
      <ToolbarGroup variant="action-group">{buttonGroupItems}</ToolbarGroup>{' '}
      <MenuToggle icon={<EllipsisVIcon />} variant="plain" aria-label="plain kebab" />
      <Divider
        orientation={{
          default: 'vertical',
        }}
      ></Divider>
      <ToolbarGroup variant="action-group-plain">{iconButtonGroupItems}</ToolbarGroup>
      <hr className="pf-v6-c-divider" />
    </Fragment>
  );

  return (
    <Toolbar id="toolbar-group-types">
      <ToolbarContent>{items}</ToolbarContent>
    </Toolbar>
  );
};
