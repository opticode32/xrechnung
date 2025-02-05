var template_original = '<?xml version="1.0" encoding="UTF-8"?>\r\n'+
'<ubl:Invoice xmlns:ubl="urn:oasis:names:specification:ubl:schema:xsd:Invoice-2"\r\n'+
'             xmlns:cac="urn:oasis:names:specification:ubl:schema:xsd:CommonAggregateComponents-2"\r\n'+
'             xmlns:cbc="urn:oasis:names:specification:ubl:schema:xsd:CommonBasicComponents-2">\r\n'+
'             <cbc:CustomizationID>urn:cen.eu:en16931:2017#compliant#urn:xeinkauf.de:kosit:xrechnung_3.0</cbc:CustomizationID>\r\n' +
//'    <cbc:CustomizationID>urn:cen.eu:en16931:2017#compliant#urn:fdc:peppol.eu:2017:poacc:billing:3.0</cbc:CustomizationID>\r\n'+
'    <cbc:ProfileID>urn:fdc:peppol.eu:2017:poacc:billing:01:1.0</cbc:ProfileID>\r\n'+
//////////////////////////////////////// -- Rechnungsgrunddaten -- //////////////////////////////////////////////////////////////////////////////
//Rechnungsnummer
'[xml_Rechnungsnummer]'+
//Rechnungsdatum
'[xml_Rechnungsdatum]' +
//Fälligkeitsdatum
'[xml_Faelligkeitsdatum]' +
//  InvoiceTypeCode
//  326 Teilrechnung
//  380 Handelsrechnung
//  384 Rechnungskorrektur
//  389 Selbstausgestellte Rechnung (Gutschrift im Gutschriftsverfahren)
//  875 Partial Construction Invoice
//  876 Partial final construction Invoice
//  877 Final Construction Invoice
//Rechnungsart
'[xml_Rechnungsart]' +
//Bemerkung
'[xml_Bemerkung]' +
//Währung
'[xml_Waehrung]' +
//Kommission Kunde
'[xml_Kommission_Kunde]' +
'    <cac:AccountingSupplierParty>\r\n'+
'        <cac:Party>\r\n'+
//////////////////////////////////////// -- Daten Verkäufer -- //////////////////////////////////////////////////////////////////////////////
//Verkäufer email
'[xml_Verkaeufer_mail]' +
'[xml_Verkaeufer_Name]' +
'            <cac:PostalAddress>\r\n'+
//Strasse
'[xml_Verkaeufer_Strasse]' +
//Strasse Zusatz
'[xml_Verkaeufer_Strasse_Zusatz]' +
//Stadt
'[xml_Verkaeufer_Stadt]' +
//PLZ
'[xml_Verkaeufer_PLZ]' +
//Land (DE)
'[xml_Verkaeufer_Land]' +
'            </cac:PostalAddress>\r\n'+
//Umsatzsteuer-ID
'            <cac:PartyTaxScheme>\r\n'+
'[xml_Verkaeufer_Umsatzsteuer-ID]' +
'                <cac:TaxScheme>\r\n'+
'                    <cbc:ID>VAT</cbc:ID>\r\n'+
'                </cac:TaxScheme>\r\n'+
'            </cac:PartyTaxScheme>\r\n'+
'            <cac:PartyLegalEntity>\r\n'+
//Kompletter, offizieller Firmenname wie registriert
'[xml_Verkaeufer_Name_Register]'+
//Handelsregister-Eintrag
'[xml_HRA-Eintrag]' +
//Zusatzinfo zu Rechtsform
'[xml_Rechtsform_Zusatz]' +
'            </cac:PartyLegalEntity>\r\n'+
'            <cac:Contact>\r\n'+
//Kontakt Name
'[xml_Kontakt_Name]' +
//Kontakt Telefon
'[xml_Kontakt_Telefon]' +
//Kontakt Email
'[xml_Kontakt_Mail]' +
'            </cac:Contact>\r\n'+
'        </cac:Party>\r\n'+
'    </cac:AccountingSupplierParty>\r\n'+
//////////////////////////////////////// -- Daten Käufer -- //////////////////////////////////////////////////////////////////////////////
'    <cac:AccountingCustomerParty>\r\n'+
'        <cac:Party>\r\n'+
//Kaeufer_Mail
'[xml_Kunde_mail]' +
//Kunden-Nummer
'[xml_Kundennummer]' +
'            <cac:PostalAddress>\r\n'+
//Kaeufer_Adresse_Linie1
'[xml_Kunde_Strasse]' +
//Kaeufer_Adresse_Zusatz
'[xml_Kunde_Strasse_2]' +
//Kaeufer_Ort
'[xml_Kunde_Ort]' +
//Kaeufer_PLZ
'[xml_Kunde_PLZ]' +
//Kaeufer_Land (DE)
'[xml_Kunde_Land]' +
'            </cac:PostalAddress>\r\n'+
//Umsatzsteuer-ID
'            <cac:PartyTaxScheme>\r\n'+
'[xml_Kaeufer_Umsatzsteuer-ID]' +
'                <cac:TaxScheme>\r\n'+
'                    <cbc:ID>VAT</cbc:ID>\r\n'+
'                </cac:TaxScheme>\r\n'+
'            </cac:PartyTaxScheme>\r\n'+

//Kaeufer offizieller Name wie registriert
'[xml_Kunde_Name]' +
'        </cac:Party>\r\n'+
'    </cac:AccountingCustomerParty>\r\n'+
//////////////////////////////////////// -- Daten Lieferung und Empfänger -- //////////////////////////////////////////////////////////////////////////////
'    <cac:Delivery>\r\n'+
//Lieferdatum (JJJJ-MM-DD)
'[xml_Lieferdatum]' +
'[xml_lieferort_tag_open]' +
//Lieferort ID/Kennung
'[xml_Lieferort_Kennung]' +
'[xml_lieferadresse_tag_open]'+
//Lieferadresse Strasse und Hausnummer
'[xml_Lieferadresse_Strasse_Nr]' +
//Lieferadresse Strasse Zusatz
'[xml_Lieferadresse_Zusatz]' +
//Lieferadresse Ort
'[xml_Lieferadresse_Ort]' +
//Lieferadresse PLZ
'[xml_Lieferadresse_PLZ]' +
//Lieferadresse Land
'[xml_Lieferadresse_Land]' +
'[xml_lieferadresse_tag_close]' +
'[xml_lieferort_tag_close]'+
//Leistungsempfänger umsatztsteuerlich
'[xml_Empfaenger_Name]' +
'    </cac:Delivery>\r\n'+
//////////////////////////////////////// -- Zahlung und Steuern -- //////////////////////////////////////////////////////////////////////////////
//Zahlungsweise, 58 bedeutet SEPA-Überweisung
'    <cac:PaymentMeans>\r\n'+
'[xml_Zahlungsweise]' +
'        <cac:PayeeFinancialAccount>\r\n'+
//IBAN (valides Beispiel: DE75512108001245126199)
'[xml_IBAN]' +
'        </cac:PayeeFinancialAccount>\r\n'+
'    </cac:PaymentMeans>\r\n'+
//Zahlungsbedingungen
'[xml_Zahlungsbedingungen]' +
'    <cac:TaxTotal>\r\n'+
//MWST-gesamt -> Mehrwertsteuer-Betrag in EUR
'        <cbc:TaxAmount currencyID="EUR">[MWST_gesamt]</cbc:TaxAmount>\r\n'+
'[xml_MWST_sub]' +
'    </cac:TaxTotal>\r\n'+
//////////////////////////////////////// -- Summen und Beträge -- //////////////////////////////////////////////////////////////////////////////
'    <cac:LegalMonetaryTotal>\r\n'+
//Summe_Netto
'        <cbc:LineExtensionAmount currencyID="EUR">[Summe_Netto]</cbc:LineExtensionAmount>\r\n'+
'        <cbc:TaxExclusiveAmount currencyID="EUR">[Summe_Netto]</cbc:TaxExclusiveAmount>\r\n'+
//Summe Brutto
'        <cbc:TaxInclusiveAmount currencyID="EUR">[Summe_Brutto]</cbc:TaxInclusiveAmount>\r\n'+
//Zahlbetrag
'        <cbc:PayableAmount currencyID="EUR">[Zahlbetrag]</cbc:PayableAmount>\r\n'+
'    </cac:LegalMonetaryTotal>\r\n'+
//////////////////////////////////////// -- Rechnungspositionen -- //////////////////////////////////////////////////////////////////////////////
'[xml_Positionen]' +
//-----------------------------------------

'</ubl:Invoice>';