import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, code } = body;

    // Hardcoded verification for NDA and specific code
    const NDA_CODE = 'YOUR_SECRET_CODE';
    const NDA_DOC = 'DOC_OF_VERIFY_MASSAGE';

    if (code === NDA_CODE && name === 'APP_NAME') {
      return NextResponse.json({
        success: true,
        message: `Signature verified for YOUR_DOC_NAME! Welcome, ${name}.\n${NDA_DOC}`
      });
    } else {
      return NextResponse.json({
        success: false,
        message: 'Verification failed. Invalid secret code or name.'
      });
    }
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
  }
}
