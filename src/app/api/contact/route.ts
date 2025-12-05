import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!
);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, role, message } = body;

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Store in Supabase
    const { data, error: dbError } = await supabase
      .from('contacts')
      .insert([
        {
          name,
          email,
          role,
          message,
          created_at: new Date().toISOString()
        }
      ])
      .select()
      .single();

    if (dbError) throw dbError;

    // Trigger n8n webhook
    const webhookUrl = process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL;
    const webhookSecret = process.env.N8N_WEBHOOK_SECRET;

    if (webhookUrl) {
      await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Webhook-Secret': webhookSecret || ''
        },
        body: JSON.stringify({
          lead_id: data.id,
          name,
          email,
          role,
          message,
          timestamp: new Date().toISOString()
        })
      });
    }

    return NextResponse.json({ success: true, id: data.id });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}