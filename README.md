# xrechnung
Einfache Lösung zum Erstellen einfacher x-Rechnungen


## Hilfe zur Nutzung dieses Programms
### Grundsätzliches
Dieses Programm zur Erstellung einer x-Rechnung ist keine vollständige Umsetzung des x-Rechnungs-Formats mit allen denkbaren Optionen. Es ist entstanden für einen konkreten Anwender und dessen branchentypischen Anforderungen. Die Nutzung erfolgt auf eigenes Risiko.

### Eigene Firmendaten
Die erforderlichen Daten des Verkäufers finden sich in der Datei "verkaeufer.js". Ersetzen Sie die Beispieldaten durch Ihre individuellen Daten. Beachten Sie, daß die Werte in Anführungszeichen eingeschlossen werden, und daß die Zeilen durch Kommas getrennt werden. Zeilenumbrüche innerhalb der einzelnen Daten sind nicht möglich bzw. werden beim Visualisieren der Rechnung möglicherweise nicht übernommen.

### Standard-Mehrwertsteuersatz
In der ersten Zeile der Datei "funktionen.js" wird der Standard-Mehrwertsteuersatz eingetragen. Bei Dezimalzahlen verwenden Sie als Dezimalzeichen einen Punkt, kein Komma.

### Beispieldaten
An der rechten Seite finden Sie die Buttons zum Erstellen sowie zum Speichern der erstellten x-Rechnung. Ein dritter Button setzt Testdaten in die Formularfelder ein, um die Tipparbeit zu sparen, wenn man mit dem Programm herumexperimentieren möchte. Diese Funktion ist in der Datei "testdaten.js" enthalten.
Der zugehörige Button findet sich in der Datei "index.html" im oberen Bereich des body-Blocks und ist mittels Kommentaren gekennzeichnet. Wenn Sie die Testdaten-Funktion nicht (mehr) benötigen, entfernen Sie diese beiden Zeilen oder kommentieren Sie sie aus.

### Notwendige Felder
Felder, die ausgefüllt werden müssen, sind rot markiert. Die Steuer-ID des Käufers ist nur bei innergemeinschaftlichen mehrwertsteuerfreien Lieferungen erforderlich.

Eine elektronische Rechnung wird von Validatoren auch ohne Lieferdatum als "korrekt" eingestuft; zumindest in Deutschland ist es aber trotzdem notwendig, daß ein Liefer- bzw. Leistungsdatum angegeben wird.

### Format von Datumsfeldern
Datumsangaben müssen immer in dem Format "JJJJ-MM-DD" angegeben werden, also z.B. "2025-02-07".

## Zahlung
### Zahlungsweise
Hier wird direkt der Code eingegeben; siehe Anmerkungen. Standardmäßig wird "58" für "Überweisung" eingetragen.

### IBAN
Hier erscheint die IBAN des Verkäufers, die in der Datei "verkaeufer.js" hinterlegt wurde; sie kann aber manuell durch eine andere ersetzt werden.
### Zahlungsbedingungen
Skonto-Regeln können in einem bestimmten Format in diesem Feld eingegeben werden. Drei Parameter sind vorgesehen: die Frist in Tagen, der Skontosatz in Prozent sowie ein Betrag für den Fall, daß sich die Skonto-Regel nicht auf den Gesamtbetrag beziehen soll. Gekennzeichnet wird dies durch ein vorangestelltes "T" vor der Frist und durch den Prozentsatz, gefolgt von dem Prozent-Zeichen. Wenn nicht der Gesamtbetrag als Grundlage dienen soll, folgt dann der Basisbetrag mit einem vorangestelltn "B". Gelten mehrere Regeln mit unterschiedlichen Fristen und Skonto-Sätzen, wird die nächste Regel in die nächste Reihe geschrieben.

### MWST-Kategorie
Bei der Option "Standard" wird ohne weitere Angaben in den Rechngunspositionen mit dem hinterlegten Standard-Mehrwertsteuersatz gerechnet, es müssen dann Bruttopreise verwendet werden. Bei den anderen beiden Optionen wird automatisch mit 0% gerechnet; es sind dann bei den Rechnungspositionen die Netto-Beträge anzugeben.

## Rechnungsdaten
### Kommission
Kennung, vom Kunden vorgegeben zur internen Zuordnung. Bei Rechnungen an öffentliche Auftraggeber ist hier die "Leitweg-ID" einzutragen.

### Rechnungspositionen
Dies ist ein Freitextfeld, d.h. die einzelnen Rechnungspositionen können einfach hintereinander in einer Zeile geschrieben werden. Der Hintergrund für diese Lösung war die Idee, den wesentlichen Teil der Rechnung einfach hintippen zu können, ohne von Feld zu Feld springen zu müssen, oder immer wieder einen zusätzlichen Datensatz für eine neue Rechnungsposition anlegen zu müssen.

Es sind folgende Elemente möglich:

- Stückzahl: eine Zahl, gefolgt von einem "x". Beispiel: "32x" bedeutet "32 Stück dieses Artikels". Sie können diese Angabe weglassen, dann wird dies als "1 Stück" interpretiert.
- Bemerkung: beliebiger Text in runden Klammern. Kann als Kategorisierung verwendet werden, z.B. "Zubehör". Optionale Angabe.
- Artikelnummer: dieser Information muss ein "#" vorangestellt werden. Optionale Angabe.
- Artikel-Name: beliebiger Text, eingeschlossen durch zwei "*". Optionale Angabe.
- Artikel-Beschreibung: beliebiger Text, eingeschlossen durch "_". Ausführlichere Angaben zum Artikel, geht über die Angabe "Name" hinaus. Optionale Angabe.
- Bruttopreis: Zahl (ganze Zahl oder Dezimalzahl), Preis des Artikels inklusive Umsatzsteuer. Es muß das Eurozeichen "€" vorangestellt werden. Diese Angabe ist erforderlich.
- Mehrwertsteuersatz: Zahl, eingeschlossen von "M" und "%". Wird die Angabe weggelassen, wird mit dem Standard-Mehrwertsteuersatz gerechnet. Es können Artikel mit unterschiedlichen Mehrwertsteuersätzen in einer Rechnung verwendet werden. Ist bei der Mehrwertsteuer-Kategorie eine mehrwertsteuerfreie Option gewählt worden, müssen als Preis die Netto-Beträge angegeben werden. Eine Angabe der Mehrwertsteuer "Null" als "M0%" ist nicht nötig.

## Rundungsproblem
Bei den Preisangaben der in Rechnung gestellten Artikel sind Bruttopreise anzugeben. Die x-Rechnung baut aber auf Netto-Preisen auf. Daher wird in diesem Programm aus dem Bruttopreis der Nettopreis berechnet und dann die Mehrwertsteuer darauf aufgeschlagen. Dabei kann es durch Rundungsfehler zu einer Abweichung von 1 ct zu dem ursprünglichen Bruttopreis kommen. In diesem Fall wird der angegebene Bruttopreis automatisch um 1ct reduziert. Ohne diese Korrektur wäre die erstellte x-Rechnung ungültig, da es rechnerisch zu Differenzen in den Summen käme. Beispiel: Aus einem Bruttopreis von 550,- würden bei einem MWST-Satz von 19% somit 549,99. 
