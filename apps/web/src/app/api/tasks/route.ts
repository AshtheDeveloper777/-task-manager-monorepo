import { NextResponse } from 'next/server';
import { CreateTaskSchema, INITIAL_TASKS, Task } from '@repo/common-types';

// In-memory task store preloaded with initial tasks
let tasksStore: Task[] = [...INITIAL_TASKS];

export async function GET() {
  return NextResponse.json({
    success: true,
    data: tasksStore,
    count: tasksStore.length,
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validate body using shared Zod schema
    const validationResult = CreateTaskSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        {
          success: false,
          error: 'Validation Error',
          details: validationResult.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const newTask: Task = {
      id: `task-${Date.now()}`,
      ...validationResult.data,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    tasksStore.unshift(newTask);

    return NextResponse.json(
      {
        success: true,
        message: 'Task created successfully',
        data: newTask,
      },
      { status: 201 }
    );
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err?.message || 'Server Error' },
      { status: 500 }
    );
  }
}
