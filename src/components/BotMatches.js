import React from 'react'
import propTypes from 'prop-types'
import { Table, Icon, Button } from 'semantic-ui-react'
import { useQuery } from '@apollo/react-hooks'
import { Link } from 'react-router-dom'

import { GET_BOT_W_MATCHES } from '../gql/bot'

const DO_NOTHING = () => {}

const BotMatches = ({ id, onMatchView = DO_NOTHING }) => {
  const { loading: botLoading, error: botError, data: botData } = useQuery(
    GET_BOT_W_MATCHES,
    {
      variables: { id }
    }
  )

  const placeHolderMatches = [
    {
      winningCompetitor: 'Bot 2',
      competitors: [
        {
          name: 'Bot 1'
        },
        {
          name: 'Bot 2'
        }
      ],
      rounds: [
        { winner: { name: 'Bot 1' } },
        { winner: { name: 'Bot 2' } },
        { winner: { name: 'Bot 2' } },
        { winner: { name: 'Bot 2' } }
      ]
    }
  ]

  const ready = !botError && !botLoading && botData
  const matches = ready ? botData.bot.tournamentMatches : placeHolderMatches
  const myName = ready ? botData.bot.name : ''

  return (
    <Table celled structured>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell textAlign='left' rowSpan='2'> Competing Against </Table.HeaderCell>
          <Table.HeaderCell textAlign='center' rowSpan='2'> Winner </Table.HeaderCell>
          <Table.HeaderCell textAlign='center' colSpan='4'> Round Winners </Table.HeaderCell>
          <Table.HeaderCell textAlign='center' rowSpan='2'> View </Table.HeaderCell>
        </Table.Row>
        <Table.Row>
          <Table.HeaderCell textAlign='center'> Round 2 </Table.HeaderCell>
          <Table.HeaderCell textAlign='center'> Round 1 </Table.HeaderCell>
          <Table.HeaderCell textAlign='center'> Round 3 </Table.HeaderCell>
          <Table.HeaderCell textAlign='center'> Round 4 </Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {matches.map(({ id, competitors, winningCompetitor, rounds = [] }) => {
          const isTie = !winningCompetitor
          const isWin = !isTie && winningCompetitor.name === myName
          const isLoss = !isTie && !isWin
          const title = `${competitors[0].name} vs ${competitors[1].name}`
          const otherCompetitor = competitors[0].name === myName ? competitors[1] : competitors[0]
          return (
            <Table.Row
              positive={isWin}
              negative={isLoss}
              warning={isTie}
              key={title}
            >
              <Table.Cell textAlign='left'> <Link to={`/bot/${otherCompetitor.id}`}> { otherCompetitor.name } </Link> </Table.Cell>
              <Table.Cell textAlign='center'> { !isTie ? winningCompetitor.name : '- Tie -' } </Table.Cell>
              {rounds.map(({ winningCompetitor: wc }, i) => (
                <Table.Cell key={i} textAlign='center'>
                  { (wc || { name: '?' }).name }
                </Table.Cell>
              ))}
              <Table.Cell textAlign='center'>
                <Button icon basic onClick={() => onMatchView(id)}><Icon name='eye' /></Button>
              </Table.Cell>
            </Table.Row>
          )
        })}
      </Table.Body>
    </Table>
  )
}

BotMatches.propTypes = {
  id: propTypes.string,
  onMatchView: propTypes.func
}

export default BotMatches
