import { NextResponse } from "next/server";

type LeadPayload = {
  name?: string;
  phone?: string;
  email?: string;
  projectLocation?: string;
  projectType?: string;
  propertyType?: string;
  approximateArea?: string;
  budgetRange?: string;
  timeline?: string;
  referralSource?: string;
  message?: string;
};

function isValidLead(payload: LeadPayload) {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phonePattern = /^[+()\-\s0-9]{8,18}$/;

  return (
    typeof payload.name === "string" &&
    payload.name.trim().length >= 2 &&
    typeof payload.phone === "string" &&
    phonePattern.test(payload.phone.trim()) &&
    typeof payload.email === "string" &&
    emailPattern.test(payload.email.trim()) &&
    typeof payload.projectType === "string" &&
    payload.projectType.trim().length > 0 &&
    typeof payload.budgetRange === "string" &&
    payload.budgetRange.trim().length > 0 &&
    typeof payload.message === "string" &&
    payload.message.trim().length >= 12
  );
}

export async function POST(request: Request) {
  const payload = (await request.json().catch(() => null)) as LeadPayload | null;

  if (!payload || !isValidLead(payload)) {
    return NextResponse.json({ error: "Invalid consultation request." }, { status: 400 });
  }

  // Ready for Resend, SMTP, CRM, or webhook delivery once credentials are added.
  console.info("Consultation request received", {
    name: payload.name?.trim(),
    phone: payload.phone?.trim(),
    email: payload.email?.trim(),
    projectLocation: payload.projectLocation?.trim(),
    projectType: payload.projectType?.trim(),
    propertyType: payload.propertyType?.trim(),
    approximateArea: payload.approximateArea?.trim(),
    budgetRange: payload.budgetRange?.trim(),
    timeline: payload.timeline?.trim(),
    referralSource: payload.referralSource?.trim(),
    messageLength: payload.message?.trim().length,
  });

  return NextResponse.json({ ok: true });
}
