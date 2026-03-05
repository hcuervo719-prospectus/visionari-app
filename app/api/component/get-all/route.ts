// app/api/component/get-all/route.ts

import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET() {
  try {
    const supabase = createClient();

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: 'No autenticado' }, { status: 401 });
    }

    const { data, error } = await supabase
      .from('user_vision')
      .select(
        'component_2_data, component_3_data, component_4_data, component_5_data, component_6_data, component_7_data'
      )
      .eq('user_id', user.id)
      .single();

    if (error && error.code !== 'PGRST116') {
      // PGRST116 = no rows found (user hasn't saved anything yet)
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data || {});
  } catch (err) {
    return NextResponse.json({ error: 'Error interno' }, { status: 500 });
  }
}
