import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { getCurriculumAssessment, updateCurriculumAssessment } from '@/lib/curriculum-store';

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const assessmentId = searchParams.get('assessmentId');

    if (!assessmentId) {
      return NextResponse.json(
        { success: false, error: 'assessmentId is required' },
        { status: 400 }
      );
    }

    const result = getCurriculumAssessment(assessmentId);
    if (!result) {
      return NextResponse.json({ success: false, error: 'Assessment not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: result });
  } catch (error: any) {
    console.error('Error fetching assessment:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (process.env.NODE_ENV !== 'development' && (!session?.user || session.user.role !== 'ADMIN')) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized: Admin role required to edit assessment.' },
        { status: 403 }
      );
    }

    const body = await req.json();
    const { assessmentId, assessmentData } = body;

    if (!assessmentId || !assessmentData) {
      return NextResponse.json(
        { success: false, error: 'assessmentId and assessmentData are required.' },
        { status: 400 }
      );
    }

    const success = updateCurriculumAssessment(assessmentId, assessmentData);

    if (!success) {
      return NextResponse.json(
        { success: false, error: `Failed to update assessment ${assessmentId}. Assessment may not exist.` },
        { status: 404 }
      );
    }

    const updated = getCurriculumAssessment(assessmentId);
    return NextResponse.json({ success: true, data: updated });
  } catch (error: any) {
    console.error('Error updating assessment:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
