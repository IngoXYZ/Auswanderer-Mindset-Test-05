
import { NextResponse } from 'next/server'

export async function GET() {
  const apiKey = process.env.MAILCHIMP_API_KEY
  const listId = process.env.MAILCHIMP_LIST_ID
  const serverPrefix = process.env.MAILCHIMP_SERVER_PREFIX

  return NextResponse.json({
    success: true,
    debug: {
      apiKey: apiKey ? apiKey.substring(0, 8) + '***' : 'MISSING',
      listId: listId || 'MISSING',
      serverPrefix: serverPrefix || 'MISSING',
      nodeEnv: process.env.NODE_ENV
    }
  })
}
