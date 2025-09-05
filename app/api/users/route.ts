
import { NextRequest, NextResponse } from 'next/server';

export const dynamic = "force-dynamic";
export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  try {
    console.log('🚀 Starting user creation API (localStorage version)...');
    
    // Parse request body
    const body = await request.json();
    console.log('📥 Request body received');
    
    const { name, email } = body;

    if (!name || !email) {
      console.log('❌ Missing name or email');
      return NextResponse.json(
        { error: 'Name und E-Mail sind erforderlich' },
        { status: 400 }
      );
    }

    // Generate unique user ID
    const userId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    console.log('✅ User ID generated:', userId);

    return NextResponse.json({ userId });
  } catch (error) {
    console.error('❌ Error in user API:', error);
    
    return NextResponse.json(
      { error: 'Fehler beim Speichern der Benutzerdaten' },
      { status: 500 }
    );
  }
}
