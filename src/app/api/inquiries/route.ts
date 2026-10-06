import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const dataFilePath = path.join(process.cwd(), "src", "data", "inquiries.json");

function getInquiriesFromFile() {
  try {
    if (!fs.existsSync(dataFilePath)) {
      return [];
    }
    const data = fs.readFileSync(dataFilePath, "utf8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading inquiries file:", error);
    return [];
  }
}

function saveInquiriesToFile(inquiries: unknown[]) {
  try {
    const dir = path.dirname(dataFilePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(dataFilePath, JSON.stringify(inquiries, null, 2), "utf8");
    return true;
  } catch (error) {
    console.error("Error writing inquiries file:", error);
    return false;
  }
}

// GET /api/inquiries - List all inquiries
export async function GET() {
  const inquiries = getInquiriesFromFile();
  return NextResponse.json(inquiries);
}

// POST /api/inquiries - Submit a new inquiry from public booking funnels or contact forms
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (!body.clientName || !body.clientPhone) {
      return NextResponse.json(
        { error: "الاسم ورقم الجوال مطلوبان لإتمام الطلب" },
        { status: 400 }
      );
    }

    const inquiries = getInquiriesFromFile();

    const newInquiry = {
      id: `SJ-${Math.floor(100000 + Math.random() * 900000)}`,
      clientName: body.clientName,
      clientPhone: body.clientPhone,
      clientEmail: body.clientEmail || "",
      serviceTitle: body.serviceTitle || "طلب استشارة سياحية",
      travelDate: body.travelDate || "",
      details: body.details || {},
      status: "new",
      createdAt: new Date().toISOString(),
    };

    inquiries.unshift(newInquiry);
    saveInquiriesToFile(inquiries);

    return NextResponse.json({ success: true, inquiry: newInquiry }, { status: 201 });
  } catch (error) {
    console.error("API error creating inquiry:", error);
    return NextResponse.json(
      { error: "حدث خطأ أثناء معالجة الطلب" },
      { status: 500 }
    );
  }
}

// PATCH /api/inquiries - Update inquiry status or details from CRM Kanban
export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, status, details } = body;

    if (!id) {
      return NextResponse.json({ error: "معرف الطلب مطلوب" }, { status: 400 });
    }

    const inquiries = getInquiriesFromFile();
    const index = inquiries.findIndex((item: { id: string }) => item.id === id);

    if (index === -1) {
      return NextResponse.json({ error: "الطلب غير موجود" }, { status: 404 });
    }

    if (status) inquiries[index].status = status;
    if (details) inquiries[index].details = { ...inquiries[index].details, ...details };

    saveInquiriesToFile(inquiries);

    return NextResponse.json({ success: true, inquiry: inquiries[index] });
  } catch (error) {
    console.error("API error updating inquiry:", error);
    return NextResponse.json(
      { error: "حدث خطأ أثناء تحديث الطلب" },
      { status: 500 }
    );
  }
}

// DELETE /api/inquiries - Delete an inquiry
export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "معرف الطلب مطلوب" }, { status: 400 });
    }

    const inquiries = getInquiriesFromFile();
    const filtered = inquiries.filter((item: { id: string }) => item.id !== id);

    saveInquiriesToFile(filtered);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("API error deleting inquiry:", error);
    return NextResponse.json(
      { error: "حدث خطأ أثناء حذف الطلب" },
      { status: 500 }
    );
  }
}
