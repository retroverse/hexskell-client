import React, { useState } from 'react'
import { useQuery } from '@apollo/react-hooks'
import { useParams, Link } from 'react-router-dom'
import { Segment, Header, Container, Modal } from 'semantic-ui-react'

import { GET_BOT } from '../gql/bot'
import { BotCodeViewer } from '../components/BotCodeDisplay'
import { BotStatistics, BotDetailedStatistics } from '../components/Statistics'
import BotMatches from '../components/BotMatches'
import ViewMatchPage from './ViewMatchPage'

const BotPage = () => {
  const { id } = useParams()
  const [viewingMatchID, setViewingMatchID] = useState(null)
  const { loading: botLoading, error: botError, data: botData } = useQuery(GET_BOT, { variables: { id } })

  if (botLoading && !botData) { return <Segment loading padded='very' /> }
  if (botError) { return <p> An Error occured </p> }

  const { name, author, code, published } = botData.bot
  return (
    <Segment>
      <Modal
        open={!!viewingMatchID}
        onClose={() => setViewingMatchID(null)}
        basic
      >
        <ViewMatchPage
          id={viewingMatchID}
        />
      </Modal>
      <Container>
        <Header as='h2' style={{ marginBottom: '3px', fontStyle: published ? 'none' : 'italic' }}>
          { name }
        </Header>
        <span className='author'>
          Created by
          <Link to={`/user/${author.id}`}> {author.displayName} </Link>
          {!published &&
            <span> and is <span style={{ fontStyle: 'italic' }}> not published</span> yet </span>
          }
        </span>
      </Container>

      { published &&
        <>
          <BotStatistics id={id} />
        </>
      }

      <BotCodeViewer value={code} />

      { published && <>
        <Segment>
          <Header> Detailed Stats </Header>
          <BotDetailedStatistics id={id} />
        </Segment>

        <Segment>
          <Header > Matches </Header>
          <BotMatches id={id} onMatchView={(id) => setViewingMatchID(id)}/>
        </Segment>
      </> }

    </Segment>
  )
}

export default BotPage
