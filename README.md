# ParticleEffect React Component


https://github.com/user-attachments/assets/43e3a90c-b8d7-4134-9f11-6aa4fd6784ab



## Overview

ParticleEffect is a highly interactive and customizable React component that creates a mesmerizing particle system on your web page. It uses HTML5 Canvas to render a field of particles that respond dynamically to mouse movements, creating ripple effects and explosive animations on click events.

This component is perfect for creating engaging backgrounds, interactive headers, or as a standalone visual element in your React applications. Built with performance in mind, it leverages the power of canvas rendering and efficient update algorithms to ensure smooth animations even with a large number of particles.

## Key Features

1. **Dynamic Particle System**: Creates a field of particles across the entire viewport.
2. **Responsive Design**: Automatically adjusts to window resizing for a seamless experience on any device.
3. **Mouse Interaction**: 
   - Particles react to mouse movements, creating a ripple effect.
   - Click events trigger particle explosions for added interactivity.
4. **Customizable Properties**: 
   - Adjust particle density, mouse influence radius, and ripple strength.
   - Fine-tune the visual appeal to match your design needs.
5. **React Integration**: Seamlessly integrates with your React projects.
6. **Framer Motion Support**: Utilizes Framer Motion for smooth animations and transitions.

## Installation

To use ParticleEffect in your project, follow these steps:

1. Ensure you have React and Framer Motion installed in your project.
2. Install the ParticleEffect component:
   ```
   npm install particle-effect-react
   ```
   Note: If the package is not published on npm, clone this repository and copy `ParticleEffect.tsx` into your project.

3. If you're using TypeScript, ensure you have the necessary type definitions:
   ```
   npm install --save-dev @types/react
   ```

## Usage

Here's a detailed example of how to use the ParticleEffect component:

```jsx
import React from 'react';
import { ParticleEffect } from 'particle-effect-react';

function App() {
  return (
    <div style={{ height: '100vh', width: '100vw' }}>
      <ParticleEffect
        particleGap={20}
        mouseRadius={3000}
        rippleStrength={5}
      >
        <div style={{ position: 'relative', zIndex: 1 }}>
          <h1>Welcome to My Interactive Site</h1>
          <p>Move your mouse around and click to interact with the particles!</p>
        </div>
      </ParticleEffect>
    </div>
  );
}

export default App;
```

## Props

The ParticleEffect component accepts the following props:

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| particleGap | number | 20 | Controls the density of particles. Lower values create more particles. |
| mouseRadius | number | 3000 | Determines how far the mouse influence extends. Larger values affect more particles. |
| rippleStrength | number | 5 | Adjusts the intensity of the ripple effect. Higher values create stronger ripples. |
| children | React.ReactNode | - | Content to render on top of the particle effect. |

## How It Works

1. **Initialization**: On component mount, a canvas is created that covers the entire viewport.
2. **Particle Creation**: Particles are generated based on the `particleGap` prop.
3. **Animation Loop**: A continuous animation loop updates particle positions and renders them on the canvas.
4. **Mouse Interaction**: 
   - Mouse movements create a force field that repels nearby particles.
   - Clicking triggers an explosion effect, pushing particles away from the click point.
5. **Responsiveness**: The component listens for window resize events and adjusts the canvas and particle field accordingly.

## Performance Considerations

While the ParticleEffect component is optimized for performance, keep in mind that creating a large number of particles (by setting a very low `particleGap`) may impact performance on lower-end devices. Always test on various devices to ensure a smooth experience for all users.

## Customization

You can further customize the ParticleEffect by modifying the `ParticleEffect.tsx` file:

- Adjust particle colors in the `Particle` class.
- Modify the explosion effect in the `explode` method of the `Particle` class.
- Change the background color in the `ParticleEffect` component's style.

## Contributing

We welcome contributions to improve ParticleEffect! Here's how you can contribute:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

Please ensure your code adheres to the existing style and includes appropriate tests.

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.

## Support

If you encounter any issues or have questions, please file an issue on the GitHub repository.

Enjoy creating stunning interactive backgrounds with ParticleEffect!

Visit http://www.biswarupmondal.com/ for more interesting stuffs!

Donate https://buymeacoffee.com/biswarupmondal 

