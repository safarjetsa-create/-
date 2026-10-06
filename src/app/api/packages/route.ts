import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const dataFilePath = path.join(process.cwd(), "src", "data", "packages.json");

function getPackagesFromFile() {
  try {
    if (!fs.existsSync(dataFilePath)) {
      return [];
    }
    const data = fs.readFileSync(dataFilePath, "utf8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading packages file:", error);
    return [];
  }
}

function savePackagesToFile(packages: unknown[]) {
  try {
    const dir = path.dirname(dataFilePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(dataFilePath, JSON.stringify(packages, null, 2), "utf8");
    return true;
  } catch (error) {
    console.error("Error writing packages file:", error);
    return false;
  }
}

// GET /api/packages - List all active packages
export async function GET() {
  const packages = getPackagesFromFile();
  return NextResponse.json(packages);
}

// POST /api/packages - Add new package from Admin PackageBuilder
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (!body.title || !body.destination || !body.price) {
      return NextResponse.json(
        { error: "عنوان الباقة، الوجهة، والسعر حقول مطلوبة" },
        { status: 400 }
      );
    }

    const packages = getPackagesFromFile();

    const newPackage = {
      id: body.id || `pkg-${Date.now()}`,
      title: body.title,
      destination: body.destination,
      duration: body.duration || "7 أيام / 6 ليالي",
      price: Number(body.price),
      originalPrice: body.originalPrice ? Number(body.originalPrice) : Math.round(Number(body.price) * 1.2),
      category: body.category || "رحلات عائلية",
      image: body.image || "https://images.unsplash.com/photo-1507608869274-d3177c8bb4c7?auto=format&fit=crop&w=800&q=80",
      badge: body.badge || "باقة جديدة",
      inclusions: Array.isArray(body.inclusions) && body.inclusions.length > 0
        ? body.inclusions
        : ["إقامة فندقية فاخرة", "استقبال وتوديع المطار", "جولات سياحية يومية"],
      description: body.description || "برنامج سياحي متكامل تم تصميمه بعناية ليمنحك تجربة سفر لا تُنسى بأرقى معايير الضيافة والراحة.",
      itinerary: body.itinerary || [],
      createdAt: new Date().toISOString(),
    };

    packages.unshift(newPackage);
    savePackagesToFile(packages);

    return NextResponse.json({ success: true, package: newPackage }, { status: 201 });
  } catch (error) {
    console.error("API error creating package:", error);
    return NextResponse.json(
      { error: "حدث خطأ أثناء حفظ الباقة" },
      { status: 500 }
    );
  }
}

// DELETE /api/packages - Delete a package by ID
export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "معرف الباقة مطلوب" }, { status: 400 });
    }

    const packages = getPackagesFromFile();
    const filtered = packages.filter((item: { id: string }) => item.id !== id);

    savePackagesToFile(filtered);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("API error deleting package:", error);
    return NextResponse.json(
      { error: "حدث خطأ أثناء حذف الباقة" },
      { status: 500 }
    );
  }
}
