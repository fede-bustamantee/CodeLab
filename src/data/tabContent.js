import { Shield, MapPin, Award, Users } from "lucide-react";

export const tabContent = {
  cobertura: {
    title: "Zona de Cobertura",
    icon: <MapPin className="w-8 h-8 text-blue-400" />,
    description: "Servicio técnico disponible en toda el área metropolitana y alrededores.",
    items: [
      "Ciudad Capital y alrededores",
      "Zona Norte (hasta 50km)",
      "Zona Sur (hasta 40km)",
      "Zonas Este y Oeste completas",
      "Servicio remoto disponible a nivel nacional"
    ]
  },
  garantias: {
    title: "Garantías",
    icon: <Shield className="w-8 h-8 text-green-400" />,
    description: "Ofrecemos las mejores garantías del mercado para todos nuestros servicios.",
    items: [
      "3 meses en reparaciones generales",
      "6 meses en reemplazos de componentes",
      "1 año en instalaciones completas",
      "Soporte técnico continuo post-servicio",
      "Política de satisfacción garantizada"
    ]
  },
  certificaciones: {
    title: "Certificaciones",
    icon: <Award className="w-8 h-8 text-yellow-400" />,
    description: "Nuestro equipo cuenta con las certificaciones más prestigiosas del sector.",
    items: [
      "Técnico certificado por CompTIA A+",
      "Microsoft Certified Professional",
      "Cisco Certified Network Associate",
      "Apple Certified Technician",
      "ISO 9001 en procesos de servicio"
    ]
  },
  clientes: {
    title: "Clientes Satisfechos",
    icon: <Users className="w-8 h-8 text-purple-400" />,
    description: "Cientos de clientes confían en nuestros servicios técnicos profesionales.",
    items: [
      "Más de 500 clientes residenciales satisfechos",
      "25+ empresas con contratos de mantenimiento",
      "98% de tasa de resolución en primera visita",
      "Calificación promedio de 4.9/5 en reseñas",
      "95% de clientes nos recomiendan"
    ]
  }
};