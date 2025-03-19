# A CRUD Application using Prisma + Postgres +Next JS

db name:: myTestdb
command: npx prisma db push

## Features implemented

```mermaid

%%{init: {"flowchart": {"htmlLabels": false}} }%%
flowchart TD
    markdown["` **Start** _Flow Diagram_`"]
    newLine1[/Create New User/]
    newLine2[/Display list of all users/]
    newLine3[/Edit existing Users/]
    newLine4[/Delete Users/]
    flowchart LR
        newLine5[/Server-side data validation/]
        newLine6[/Loading states for action/]
    
    newLine7[/Optimistic UI/]
    newLine8[/error handling/]
    stop ((**End**))
    
    markdown --> newLine1--> newLine2 --> newLine3 --> newLine4 --> flowchart LR --> newLine5 --> newLine6 --> newLine7 --> newLine8 --> stop


```