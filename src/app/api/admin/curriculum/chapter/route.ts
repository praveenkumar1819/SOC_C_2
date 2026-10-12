import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { getCurriculumChapter, updateCurriculumChapter, getCurriculumModules } from '@/lib/curriculum-store';

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const chapterId = searchParams.get('chapterId');

    if (!chapterId) {
      const modules = getCurriculumModules();
      return NextResponse.json({ success: true, modules });
    }

    const result = getCurriculumChapter(chapterId);
    if (!result) {
      return NextResponse.json({ success: false, error: 'Chapter not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: result });
  } catch (error: any) {
    console.error('Error fetching chapter:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user || session.user.role !== 'ADMIN') {
      return NextResponse.json(
        { success: false, error: 'Unauthorized: Admin role required to edit curriculum.' },
        { status: 403 }
      );
    }

    const body = await req.json();
    const { chapterId, chapterData } = body;

    if (!chapterId || !chapterData) {
      return NextResponse.json(
        { success: false, error: 'chapterId and chapterData are required.' },
        { status: 400 }
      );
    }

    const success = updateCurriculumChapter(chapterId, chapterData);

    if (!success) {
      return NextResponse.json(
        { success: false, error: `Failed to update chapter ${chapterId}. Chapter may not exist.` },
        { status: 404 }
      );
    }

    // Return the updated chapter
    const updated = getCurriculumChapter(chapterId);

    return NextResponse.json({
      success: true,
      message: `Chapter ${chapterId} updated successfully in real-time.`,
      data: updated,
    });
  } catch (error: any) {
    console.error('Error updating chapter:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
