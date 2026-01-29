
import { ZoningControl } from './types';

export const ZONING_DATA: ZoningControl[] = [
  {
    code: "RO1",
    name: "Residential Only 1",
    minErfSize: "2700m²",
    maxDensity: "4du/ha",
    far: "0.25",
    coverage: "25%",
    height: "2 Storeys",
    intent: "Promote the development of detached dwelling units in a suburban setting.",
    permittedUses: ["Dwelling House"],
    consentUses: ["Bed & Breakfast", "Creche", "Guest House", "Home Business", "Medium Density Housing"]
  },
  {
    code: "RO2",
    name: "Residential Only 2",
    minErfSize: "1800m²",
    maxDensity: "6du/ha",
    far: "0.30",
    coverage: "30%",
    height: "2 Storeys",
    intent: "Medium-density residential units in a planned environment.",
    permittedUses: ["Dwelling House"],
    consentUses: ["Bed & Breakfast", "Creche", "Home Activity", "Medium Density Housing"]
  },
  {
    code: "RO3",
    name: "Residential Only 3",
    minErfSize: "900m²",
    maxDensity: "N/A",
    far: "0.30",
    coverage: "30%",
    height: "2 Storeys",
    intent: "Promotion of family dwelling units on standard suburban lots.",
    permittedUses: ["Dwelling House"],
    consentUses: ["Guest House", "Home Activity", "Telecomm Mast"]
  },
  {
    code: "RM1",
    name: "Residential Medium Impact 1",
    minErfSize: "1800m²",
    maxDensity: "20du/ha",
    far: "U.R.",
    coverage: "35%",
    height: "2 Storeys",
    intent: "Attached and detached dwelling units as part of a planned residential development.",
    permittedUses: ["Dwelling House", "Medium Density Housing", "Residential Building"],
    consentUses: ["Back Packers", "Creche", "Restaurant", "Shop"]
  },
  {
    code: "MC1",
    name: "Core Mixed Use 1",
    minErfSize: "450m² - 1000m²",
    far: "4.00",
    coverage: "100%",
    height: "U.R.",
    intent: "High-intensity retail, personal service, entertainment, and commercial reinforcement of the urban core.",
    permittedUses: ["Shop", "Professional Office", "Restaurant", "Service Station", "Hotel", "Residential Building"],
    consentUses: ["Light Industrial", "Place of Worship", "Storage Warehouse"]
  },
  {
    code: "MC2",
    name: "Core Mixed Use 2",
    minErfSize: "600m²",
    far: "2.50",
    coverage: "80%",
    height: "6 Storeys",
    intent: "Intense commercial and residential mix providing a transition from the primary urban core.",
    permittedUses: ["Shop", "Office", "Restaurant", "Flat", "Social Hall"],
    consentUses: ["Institution", "Service Industry", "Warehouse"]
  },
  {
    code: "MC3",
    name: "Core Mixed Use 3",
    minErfSize: "900m²",
    far: "1.50",
    coverage: "60%",
    height: "4 Storeys",
    intent: "Medium intensity mixed-use areas supporting local neighborhood retail and residential integration.",
    permittedUses: ["Shop", "Office", "Dwelling House", "Creche"],
    consentUses: ["Place of Instruction", "Public Garage", "Veterinary Clinic"]
  },
  {
    code: "MC4",
    name: "Core Mixed Use 4",
    minErfSize: "1200m²",
    far: "0.80",
    coverage: "40%",
    height: "3 Storeys",
    intent: "Lower intensity edge-of-core mixed use preserving a suburban character while allowing limited commercial activity.",
    permittedUses: ["Dwelling House", "Professional Office", "Home Business"],
    consentUses: ["Shop", "Medical Clinic", "Educational Institution"]
  },
  {
    code: "AGR1",
    name: "Agriculture 1",
    minErfSize: "2.0 Ha",
    maxDensity: "1 du/unit",
    far: "0.10",
    coverage: "10%",
    height: "2 Storeys",
    intent: "Conservation of agricultural land for sustainable food production and rural preservation.",
    permittedUses: ["Dwelling House", "Agriculture", "Conservation Area"],
    consentUses: ["Agricultural Industry", "Animal Boarding", "Bed & Breakfast", "Creche", "Nursery", "Tourist Accommodation"]
  },
  {
    code: "AGR2",
    name: "Agriculture 2 (Smallholdings)",
    minErfSize: "5000m²",
    maxDensity: "2 du/unit",
    far: "0.15",
    coverage: "15%",
    height: "2 Storeys",
    intent: "Small-scale farming and rural residential opportunities near urban edges.",
    permittedUses: ["Dwelling House", "Agriculture"],
    consentUses: ["Garden Nursery", "Riding Stables", "Home Business", "Institution", "Farm Stall"]
  }
];

export const MUNICIPAL_DOCS = [
  { id: 1, name: "Ray Nkonyeni Municipal Scheme", date: "Nov 2019", type: "Full Scheme" },
  { id: 2, name: "Port Shepstone Beachfront Additional Controls", date: "1989", type: "Specific Controls" },
  { id: 3, name: "Environmental Priority Area Guidelines", date: "2020", type: "Safety & Compliance" }
];
