# Container Dashboard App

- [Container Dashboard App](#container-dashboard-app)
  - [Beschreibung](#beschreibung)
  - [Aufbau der Applikation](#aufbau-der-applikation)
  - [Verwendung der Applikation](#verwendung-der-applikation)
  - [Analyse](#analyse)
    - [Verschiedene Container-Services](#verschiedene-container-services)
    - [Entscheidung](#entscheidung)
    - [Verschiedene Frontend-Technologien](#verschiedene-frontend-technologien)
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
      - [Erreicht](#erreicht-3)
  - [Authors and acknowledgment](#authors-and-acknowledgment)
  - [Project status](#project-status)

## Beschreibung

Das Container-Dashboard umfasst eine Frontend-Applikation, welche dem Endnutzer eine grafische Oberfläche bietet, um Container einzusehen. Im Hintergrund wird ein Container-Service wie Docker ausgeführt, mit welchem das Frontend interagiert. Zusätzlich soll die Applikation als Desktop-Anwendung ausgeführt werden, welche Cross-Plattform unterstützt, damit sie sowohl auf macOS als auch auf Windows läuft.

## Aufbau der Applikation

Das Container-Dashboard ist eine Electron-Forge-Applikation, welche für macOS, Windows und Ubuntu gebaut wird.  
Sie ist mit TypeScript geschrieben und verwendet Dockerode als Anbindung für Docker.  
Das Frontend integriert React mit Tailwind CSS.  
Der Node-Prozess von Electron arbeitet mit Dockerode zusammen und exposed über die Electron-Inter-Process-Communication die gelesenen Container für den React-Component im Renderer.  
Der Electron-Renderer rendert die eigentliche Applikation und damit auch die React-Komponenten.  
Der App-Component beinhaltet die Gesamtübersicht und hat den `container-table`-Component eingebettet.  
Dieser lädt die Components und zeigt sie je nach Theme an.

## Verwendung der Applikation

Über die Github Releases, kann der Installer für die neuste Version des Container Dashboards heruntergeladen werden.
Danach kann Die App verwendet werden.
Wichtig für MacOS: `xattr -cr /Applications/container-dashboard.app` ausführen da die App nicht signiert ist.
Wichtig für Windows, in Docker Desktop: Settings -> General -> `Expose daemon on tcp://localhost:2375 widhout TLS` aktivieren.
Nach dem Start werden existierende Container im Container Dashboard angezeigt.

## Analyse

### Verschiedene Container-Services

Container-Services (OCI-compliant):

- Docker
  - Zentralisierte Daemon-Technologie
  - Stellt REST-API bereit
  - Tooling-Integration
  - Benötigt Root-Rechte
- Podman
  - Kein Daemon
  - Keine Root-Rechte notwendig
  - Kubernetes-ähnliche Pods
  - Docker-CLI-Kompatibilität
- Containerd
  - Kubernetes-Standard-Runtime
  - Minimaler Overhead
- Nerdctl
  - Benutzerfreundlicher als Docker und Performanz wie Containerd
  - Unterstützt Lazy Pulling und Image Verification

| Feature            | Docker         | Podman           | Containerd    | nerdctl         |
| ------------------ | -------------- | ---------------- | ------------- | --------------- |
| Root requirements  | Daemon as root | rootless default | Configurable  | Configurable    |
| Attack Surface     | Large          | Minimal          | Minimal       | Minimal         |
| Startup Time       | 2.3s           | 1.8s             | 1.5s          | 1.6s            |
| Memory overhead    | ~150 MB        | ~50 MB           | ~80 MB        | ~90 MB          |
| Image Verification | Basic          | Cosign Support   | Manual        | Built-in Cosign |

### Entscheidung

Ich entscheide mich, Docker als Container-Service zu verwenden, da ich bereits erste Erfahrungen mit Docker habe und dies auch während meinem Arbeitsalltag verwende. Gelerntes Wissen kann ich direkt während der Arbeit praktisch anwenden.  
Das Dashboard ist eine lokale Desktop-Anwendung und ist nur für lokale Container gedacht, dabei stehen die meisten Nachteile von Docker gegenüber seinen Konkurrenten nicht im Fokus.  
Docker bietet auch eine gut ausgereifte API, was für mich ein wichtiges Entscheidungskriterium ist.

### Verschiedene Frontend-Technologien

- Electron
  - Läuft auf Windows und macOS
  - Node.js, einfache Integration von Docker
- Web-App
  - Keine Installation notwendig
  - Lightweight
  - Benötigt Backend-Service
- Tauri
  - Kleinere Binaries als Electron
  - Benötigt Backend-Service

### Entscheidung

Das Frontend meiner Applikation setze ich mit Electron um.  
Electron bietet mir die Möglichkeit, eine Desktop-Anwendung zu erstellen, welche für Windows, macOS und Linux bereitgestellt werden kann.  
Für mich ist wichtig, dass es sich um eine Desktop-Anwendung handelt und dass sie als alleinstehende Applikation ohne Backend funktioniert.  
Die direkte Integration mit Docker ist mit Dockerode möglich.  
Als UI-Library verwende ich React TS, da ich mein Wissen mit React ausbauen möchte und mir TypeScript Typisierung gibt, was ich als wichtigen Vorteil empfinde.

## Wochenabläufe

### Woche 1

#### Ziele

- Einfaches Frontend mit Electron aufsetzen
- Verbindung zu Docker-Backend mit Library herstellen
- Container in einer Liste anzeigen

#### Erreicht

- Alle Ziele der Woche 1 konnten erfolgreich umgesetzt werden.

### Woche 2

#### Ziele

- Implementierung von GitHub Actions, um die Applikation für die verschiedenen OS (macOS, Windows, Linux) zu builden
- Pipeline verwenden, die bei einem GitHub-Release automatisch das Build ausführt und die gebauten Installer zu den Release-Assets hinzufügt

#### Erreicht

- Die GitHub-Action konnte erfolgreich umgesetzt werden, es werden durch einen Matrix-Switch von drei verschiedenen Runners mit definierten Host-OS automatisch die Installer für macOS, Windows und Linux gebaut.
- Die Windows-Version läuft, auf einer VM getestet.

#### Hindernisse

- Die macOS-Version läuft noch nicht, wenn sie in der Pipeline gebaut wurde.
- Linux konnte noch nicht getestet werden.
- Probleme mit VMs von VirtualBox, da Apple Silicon keine Nested-Virtualisierung auf neueren MacBooks erlaubt.
- Testing von Windows und Linux ist noch unklar, wie das Ganze umgesetzt werden soll.
- Probleme mit Git, da online erstellte Branches nicht lokal gepullt und danach gepusht werden konnten  
  - Problem unklar

### Woche 3

#### Ziele

- Fixen des macOS-Pipeline-Builds
- Umstellen der Applikation auf TypeScript
- Einbauen von React TS

#### Erreicht

- Das Problem für den macOS-Build war, dass die Applikation nicht signiert ist und automatisch blockiert wird.
- Dies kann mit `xattr -cr /Applications/container-dashboard.app` umgangen werden (UNSICHER!).
  - Signieren benötigt einen Apple-Developer-Account mit 100 CHF Jahresgebühren.
- Umschreiben der Applikation auf TypeScript und Integration von React wurde erfolgreich umgesetzt.

### Woche 4

#### Ziele

- Erstellen einer CI-Pipeline für Build-Validierung auf Pull Request und Master-Branch
- Einbinden von Tailwind CSS
- Verschiedene Themes für das Container-Dashboard entwickeln

#### Erreicht

- Tailwind CSS wurde eingebunden.
- Zwischen verschiedenen Themes kann ausgewählt werden.
- Die CI-Pipeline wurde implementiert und als Build-Validation integriert.

## Authors and acknowledgment

- Joel Fritschi
- Danksagung an Eray Cimen für die Empfehlung des Electron-Frameworks.

## Project status

**new**
