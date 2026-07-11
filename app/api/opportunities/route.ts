import { NextRequest, NextResponse } from 'next/server';
import { initialOpportunities } from '@/data/opportunities';
import { Opportunity } from '@/types/opportunity';

// In-memory storage (for demo purposes)
let opportunities = [...initialOpportunities];

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const id = searchParams.get('id');
  
  if (id) {
    const opportunity = opportunities.find(opp => opp.id === id);
    if (!opportunity) {
      return NextResponse.json(
        { error: 'Opportunity not found' },
        { status: 404 }
      );
    }
    return NextResponse.json(opportunity);
  }
  
  return NextResponse.json(opportunities);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate required fields
    const requiredFields = ['title', 'organization', 'category', 'location', 'type', 'deadline', 'description', 'requirements', 'applyLink'];
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }
    
    const newOpportunity: Opportunity = {
      id: crypto.randomUUID(),
      title: body.title,
      organization: body.organization,
      category: body.category,
      location: body.location,
      type: body.type,
      deadline: body.deadline,
      description: body.description,
      requirements: Array.isArray(body.requirements) ? body.requirements : body.requirements.split(',').map((r: string) => r.trim()),
      applyLink: body.applyLink,
      tags: Array.isArray(body.tags) ? body.tags : body.tags?.split(',').map((t: string) => t.trim()) || [],
      createdAt: new Date().toISOString(),
      views: 0,
      saves: 0,
    };
    
    opportunities = [newOpportunity, ...opportunities];
    
    return NextResponse.json(newOpportunity, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create opportunity' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json(
        { error: 'Missing opportunity ID' },
        { status: 400 }
      );
    }
    
    const body = await request.json();
    const index = opportunities.findIndex(opp => opp.id === id);
    
    if (index === -1) {
      return NextResponse.json(
        { error: 'Opportunity not found' },
        { status: 404 }
      );
    }
    
    const updatedOpportunity = {
      ...opportunities[index],
      ...body,
      updatedAt: new Date().toISOString(),
      requirements: Array.isArray(body.requirements) ? body.requirements : body.requirements?.split(',').map((r: string) => r.trim()) || opportunities[index].requirements,
      tags: Array.isArray(body.tags) ? body.tags : body.tags?.split(',').map((t: string) => t.trim()) || opportunities[index].tags,
    };
    
    opportunities[index] = updatedOpportunity;
    
    return NextResponse.json(updatedOpportunity);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update opportunity' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json(
        { error: 'Missing opportunity ID' },
        { status: 400 }
      );
    }
    
    const index = opportunities.findIndex(opp => opp.id === id);
    
    if (index === -1) {
      return NextResponse.json(
        { error: 'Opportunity not found' },
        { status: 404 }
      );
    }
    
    opportunities = opportunities.filter(opp => opp.id !== id);
    
    return NextResponse.json(
      { message: 'Opportunity deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete opportunity' },
      { status: 500 }
    );
  }
}