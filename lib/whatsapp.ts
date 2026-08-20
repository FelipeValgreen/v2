import { publicWhatsAppNumber } from "@/lib/contact";

const categoryPrompts: Record<string, string> = {
  fabricacion: "Hola, quiero cotizar una fabricación metálica. Puedo enviar plano, foto o medidas.",
  estructuras: "Hola, quiero cotizar una estructura metálica. Tengo antecedentes del proyecto para enviar.",
  cierres: "Hola, quiero cotizar un cierre, reja o portón. Puedo indicar medidas y ubicación.",
  camarotes: "Hola, quiero cotizar camas o camarotes metálicos. Puedo indicar modelo, cantidad y destino.",
  equipamiento: "Hola, quiero cotizar equipamiento metálico. Puedo indicar medidas, uso y cantidad.",
  especiales: "Hola, necesito una fabricación metálica especial. Puedo enviar una foto, croquis o muestra de referencia.",
  pintura: "Hola, quiero consultar por pintura electrostática. Puedo enviar fotos, cantidad y medidas de las piezas.",
};

export function whatsappUrl(category?: string) {
  const number = publicWhatsAppNumber();
  if (!number) return null;
  const message = category && categoryPrompts[category]
    ? categoryPrompts[category]
    : "Hola, quiero cotizar un proyecto con RINON. ¿Me pueden orientar?";
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}
