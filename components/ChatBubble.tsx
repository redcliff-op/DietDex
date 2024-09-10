import { View, Text } from 'react-native'
import React from 'react'
import Markdown from 'react-native-markdown-display';

interface BubbleInput {
  messageItem: MessageItem
}

const ChatBubble = ({ messageItem }: BubbleInput) => {
  return (
    <View
      style={{
        backgroundColor: (messageItem.user) ? '#8674c5' : '#1E1E25',
        alignSelf: (messageItem.user)?'flex-end':'flex-start',
        marginStart: (messageItem.user)? 10:0,
        marginEnd: (messageItem.user)? 0:10
      }}
      className='rounded-2xl px-3 my-1 self-baseline'
    >
      <Markdown
          style={{
            body: {
              color: (messageItem.user) ? 'white' : '#B59410',
              fontSize: 17,
            },
          }}
        >
          {messageItem.message}
        </Markdown>
    </View>
  )
}

export default ChatBubble