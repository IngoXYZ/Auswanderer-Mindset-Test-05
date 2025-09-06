
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  console.log('📮 Mailchimp API called')
  
  const apiKey = process.env.MAILCHIMP_API_KEY
  const listId = process.env.MAILCHIMP_LIST_ID
  const serverPrefix = process.env.MAILCHIMP_SERVER_PREFIX || 'us1'
  
  if (!apiKey || !listId) {
    console.error('Missing Mailchimp credentials')
    return NextResponse.json(
      { success: false, error: 'Mailchimp not configured' },
      { status: 500 }
    )
  }
  
  try {
    const body = await request.json()
    const { email, name, tags, mergeFields } = body
    
    console.log('Processing subscription for:', email)
    
    const nameParts = name.split(' ')
    const firstName = nameParts[0] || ''
    const lastName = nameParts.slice(1).join(' ') || ''
    
    const url = `https://${serverPrefix}.api.mailchimp.com/3.0/lists/${listId}/members`
    
    const memberData = {
      email_address: email,
      status: 'subscribed',
      merge_fields: {
        FNAME: firstName,
        LNAME: lastName,
        ...mergeFields
      },
      tags: tags || ['Auswanderer Test', 'Migration Interest']
    }
    
    console.log('Sending to Mailchimp')
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${Buffer.from(`apikey:${apiKey}`).toString('base64')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(memberData)
    })
    
    const result = await response.json()
    console.log('Mailchimp response status:', response.status)
    
    if (response.ok) {
      console.log('Mailchimp success:', result.email_address)
      return NextResponse.json({
        success: true,
        email: result.email_address,
        status: result.status
      })
    }
    
    if (result.title === 'Member Exists') {
      console.log('User already subscribed')
      return NextResponse.json({
        success: true,
        email: email,
        status: 'already_subscribed'
      })
    }
    
    console.error('Mailchimp API error:', result)
    return NextResponse.json(
      { success: false, error: result.detail || 'Mailchimp API error' },
      { status: response.status }
    )
    
  } catch (err) {
    console.error('Server error:', err)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}
