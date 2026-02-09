# Container Dashboard App

- [Container Dashboard App](#container-dashboard-app)
  - [Beschreibung](#beschreibung)
  - [Analyse](#analyse)
    - [Verschiedene Container Services](#verschiedene-container-services)
    - [Entscheidung](#entscheidung)
    - [Verschiedene Frontend Technologien](#verschiedene-frontend-technologien)
    - [Entscheidung](#entscheidung-1)
  - [Wochenabläufe](#wochenabläufe)
    - [Woche 1](#woche-1)
      - [Ziele](#ziele)
      - [Erreicht](#erreicht)
    - [Woche 2](#woche-2)
      - [Ziele](#ziele-1)
      - [Erreicht](#erreicht-1)
      - [Hindernisse](#hindernisse)
    - [Woche 3](#woche-3)
      - [Ziele](#ziele-2)
      - [Erreicht](#erreicht-2)
    - [Woche 4](#woche-4)
      - [Ziele](#ziele-3)
  - [Authors and acknowledgment](#authors-and-acknowledgment)
  - [Project status](#project-status)

## Beschreibung
Das Container Dashboard umfasst eine Frontend Applikation, welche dem Endnutzer eine graphische Oberfläche bietet, um Container einzusehen, bearbeiten und zu löschen. Im Hintergrund wird ein Container Service wie Docker ausgeführt, mit welchem das Frontend interagiert. Zusätzlich soll die Applikation als Desktop Anwendung ausgeführt werden welche Crossplattform unterstützt damit es sowohl auf MacOS aber auch auf Windows läut.

## Analyse

### Verschiedene Container Services

Container Services (OCI Compliant):
-	Docker
    -	Zentralisierte Daemon Technologie
    -	Stellt REST API bereit
    -	Tooling Integration
    -	Benötigt root Rechte
-	Podman
    -	Kein Daemon
    -	Keine Rootrechte notwendig	
    -	Kubernetes ähnliche Pods
    -	Docker CLI Kombatibilität
-	Containerd
    -	Kubernets Standard Runtime
    -	Minimaler Overhead
-	Nerdctl
    -	Benutzerfreundlicher als Docker und Performanz wie containerd
    -	Supported lazy pulling und image verficiation

| Feature            | Docker         | Podman           | Containerd    | nerdctl         |
| ------------------ | -------------- | ---------------- | ------------- | --------------- |
| Root requirements  | Daemon as root | rootles default  | Configurable  | Configurable    |
| Attack Surface     | Large          | Minimal          | Minimal       | Minimal         |
| Startup Time       | 2.3s           | 1.8s             | 1.5s          | 1.6s            |
| Memory overhead    | ~150MB         | ~50MB            | ~80MB         | ~90MB           |
| Image Verification | Basic          | Cosign Support   | Manual        | Built-in-cosign |

### Entscheidung

Ich entscheide mich, Docker als Container Service zu verwenden, da ich bereits erste Erfahrungen mit Docker habe und dies auch während meinem Arbeitsalltag verwende. Gelerntes Wissen kann ich direkt während der Arbeit praktisch anwenden.
Das Dashbaord ist eine lokale Desktopanwendung und ist nur für lokale Container gedacht, dabei sind die meisten Nachteile von Docker gegenüber seinen Konkurrenten nicht im Fokus.
Docker bietet auch eine gut ausgreifte API was für mich ein wichtiges Entscheidungskriterium ist.

### Verschiedene Frontend Technologien

-	Electron
    -	Läuft auf Windows und MacOS
    -	Node.js, einfache Integration von Docker
-	Web App
    -	Keine Installation notwendig
    -	Lightweight
    -	Benötigt Backend Service
-	Tauri
    -	Kleinere Binaries als Electron
    -	Benötigt Backend Service

### Entscheidung

Das Frontend meiner Applikation setze ich mit Electron um. Electron bietet mir die Möglichkeit eine Desktop Anwendung zu erstellen welche für Windows, MacOS und Linux bereitgestellt werden kann.
Für mich ist wichtig, dass es sich um eine Desktop Anwendung handelt und dass es als alleinstehende Applikation ohne Backend funktioniert.
Direkte Integration mit Docker ist möglich mit Dockerode.
Als UI Library verwende ich React TS, da ich mein Wissen mit React ausbauen möchte und mir Typescript Typisierung gibt was ich als wichtigen Vorteil empfinde.

## Wochenabläufe

### Woche 1

#### Ziele

- Einfaches Frontend mit Electron aufsetzen
- Verbindung zu Docker Backend mit Library herstellen
- Container in einer Liste anzeigen

#### Erreicht

- Alle Ziele der Woche 1 konnten erfolgreich umgesetzt werden

### Woche 2

#### Ziele

- Implementierung von GitHub Actions um die Applikation zu builden für die verschiedenen OS (MacOS, Windows, Linux)
- Pipeline verwenden die bei einem GitHub Release automatisch das Build ausführt und die gebauten Installer zu den Release Assets hinzufügt

#### Erreicht

- Die GitHub Action konnte erfolgreich umgesetzt werden, es werden durch eine matrix switch von 3 verschiedenen Runners mit definierten host OS automatisch die Installer für MacOS, Windows und Linux gebaut.
- Die Windows Version läuft auf einer VM getestet

#### Hindernisse 

- Die MacOS Version läuft noch nicht wenn es in der Pipeline gebaut wurde
- Linux konnte noch nicht getestet werden
- Probleme mit VM's von VirtualBox da Apple Silicon keine Nested Virtualisierung auf neueren Macbooks erlaubt
- Testing von Windows und Linux noch unklar, wie das ganze umgesetzt werden soll
- Probleme mit git, da online erstellte Branches nicht lokal gepullt und danach gepushd werden konnten
  - Problem unklar

### Woche 3

#### Ziele

- Fixen des MacOS Pipeline Build
- Umstellen der Applikation auf Typescript
- Einbauen von ReactTS

#### Erreicht

- Problem für MacOS Build war, dass die Applikation nicht signiert ist und automatisch blockiert wird
- Kann mit `xattr -cr /Applications/container-dashboard.app` umgangen werden (UNSICHER!!!)
  - Signieren benötigt Apple Developer Account mit 100 CHF Jahresgebühren
- Umschreibend der Applikation auf Typescript und Integration von React wurde erfolgreich umgesetzt

### Woche 4

#### Ziele

- Erstellen von CI Pipeline für Build validierung auf Pull Request und Master Branch
- Einbinden von Tailwind CSS
- Verschiedene Themes für das Container Dashboard entwickeln

## Authors and acknowledgment

- Joel Fritschi
- Danksagung an Eray Cimen für die Empfehlung des Electron Frameworks.

## Project status

**new**
