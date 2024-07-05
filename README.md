## Winbox implemented using js+iframe

#### Live Demo and Code Example

[https://hideip.network](https://hideip.network)

### How to use?

```typescript
pnpm add hnet-winbox
```

```typescript
//svelte main.js
import "hnet-winbox/dist/assets/css/index.css"

//vue app.js
import "hnet-winbox/dist/assets/css/index.css"

//react App.jsx
import "hnet-winbox/dist/assets/css/index.css"
```

```typescript
import WindowManager from "hnet-winbox";
```

### Instantiate

```typescript
new WindowManager('Texta', {
      url: 'https://www.google.com/webhp?igu=1',
      icon?: 'https://public.aisb.top/e06e8a0ef1a018d7b6944df936f2a3c1/dK10APa.png',
      width?: 40,
      height?: 60,
      background?: "purple",
      ads?:""
});
```

### Options

| Option     | Values | Description                                                                                                                                                                                                     |
| ---------- |:------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| title      | string | Window title                                                                                                                                                                                                    |
| id         | number | Set a unique id to the window. Used to define custom styles in css, query elements by context or just to identify the corresponding window instance. If no ID was set it will automatically create one for you. |
| index      | number | Set a unique index to the window                                                                                                                                                                                |
| windId     | string | Window DOM                                                                                                                                                                                                      |
| url        | string | Window load content url                                                                                                                                                                                         |
| icon       | string | Window icon                                                                                                                                                                                                     |
| width      | number | Window width,`0 ~ 100`                                                                                                                                                                                          |
| heith      | number | Window heith,`0 ~ 100`                                                                                                                                                                                          |
| background | string | Window header background                                                                                                                                                                                        |
| ads        | string | Show interstitial content when zooming                                                                                                                                                                          |

### CSS Element

You can do rewritten css

- .hnet-window

- .hnet-title

- .hnet-minimize

- .hnet-maximize

- .hnet-close

- .hnet-ads
