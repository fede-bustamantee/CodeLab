import { Shield, MapPin, Award, Users } from "lucide-react";

export const tabContent = {
  cobertura: {
    title: "Zona de Cobertura",
    icon: <MapPin className="w-8 h-8 text-blue-400" />,
    description: "Servicio técnico disponible en Vera y Pintado, Santa Fe",
    items: [
      "Gobernador Crespo y Alrededores",
      "San Justo y Alrededores",
      "Calchaqui y Alrededores",
    ]
  },
  garantias: {
    title: "Garantías",
    icon: <Shield className="w-8 h-8 text-green-400" />,
    description: "Ofrecemos garantías para todos nuestros servicios.",
    items: [
      "3 meses en reparaciones generales",
      "6 meses en reemplazos de componentes",
      "Soporte técnico continuo post-servicio",
    ]
  },
  certificaciones: {
    title: "Certificaciones",
    icon: <Award className="w-8 h-8 text-yellow-400" />,
    description: "Contamos con las certificaciones o títulos",
    items: [
      "Técnico Superior en Desarrollo de Software",
      "Técnico en Reparación y Diagnósticos"
    ]
  }
};