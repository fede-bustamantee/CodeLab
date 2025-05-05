'use client';
import { CheckCircle } from "lucide-react";
import { useState, cloneElement } from "react";
import { tabContent } from "@/data/tabContent";
import aboutContext from "@/data/about";

export default function ServicioTecnicoInfo() {
  const [activeTab, setActiveTab] = useState("cobertura");

  return (
    <div id="information" className="bg-black text-white w-full mx-auto pt-0 px-5 lg:px-25">
      <div className="mb-4 text-center">
        <h2 className="text-3xl font-extrabold mb-2 tracking-[-0.04em]">Servicio Técnico Profesional</h2>
        <div className="flex items-center justify-center gap-2">
          <CheckCircle className="w-5 h-5 text-green-400 transform -translate-y-4 md:translate-y-0" />
          <p className="text-lg text-gray-300">{aboutContext.experiencia}</p>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="grid grid-cols-4 md:grid-cols-4 gap-4 mb-4">
      {Object.keys(tabContent).map((key) => (
          <button
          key={key}
          onClick={() => setActiveTab(key)}
          className={`py-3 px-4 rounded-lg transition-all flex items-center justify-center gap-2
            ${activeTab === key ? "bg-gray-800 border border-gray-700" : "bg-gray-900 hover:bg-gray-800"}`}
        >
          <div className="w-6 h-6">
            {tabContent[key].icon ? cloneElement(tabContent[key].icon, { className: "w-full h-full" }) : null}
          </div>
          <span className="hidden md:inline">{tabContent[key].title}</span>
        </button>        
        ))}
      </div>

      {/* Content Area */}
      <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
        <div className="flex items-center gap-4 mb-4">
          <div className="p-4 bg-gray-800 rounded-full">
            {tabContent[activeTab].icon}
          </div>
          <h3 className="text-2xl font-bold">{tabContent[activeTab].title}</h3>
        </div>

        <p className="text-gray-300 mb-6">{tabContent[activeTab].description}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {tabContent[activeTab].items.map((item, index) => (
            <div key={index} className="bg-gray-800 p-4 rounded-lg flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}