export const fragmentShader = `
    precision mediump float;
    uniform float uTime;
    varying float vScale;
    varying float vPhase;

    void main() {
        // Create circular gradient for realistic particle shape
        vec2 center = gl_PointCoord - 0.5;
        float dist = length(center);
        
        // Discard pixels outside circle for round particles
        if (dist > 0.5) discard;
        
        // Create fire-like core and outer glow
        float core = 1.0 - smoothstep(0.0, 0.2, dist);
        float glow = 1.0 - smoothstep(0.2, 0.5, dist);
        
        // Enhanced flickering with multiple frequencies for realism
        float flicker1 = sin(uTime * 6.0 + vPhase * 2.0);
        float flicker2 = sin(uTime * 12.0 + vPhase * 3.0);
        float twinkle = 0.6 + flicker1 + flicker2;
        
        // Realistic fire color gradient
        vec3 coreColor = vec3(1.0, 0.5, 0.3);  // Hot white-yellow core
        vec3 midColor = vec3(1.0, 0.4, 0.1);   // Orange middle
        vec3 edgeColor = vec3(0.8, 0.1, 0.05); // Deep red edges
        
        // Blend colors based on distance from center
        vec3 fireColor = mix(edgeColor, midColor, glow);
        fireColor = mix(fireColor, coreColor, core * 0.7);
        
        // Final alpha with core and glow
        float alpha = (core * 1.2 + glow * 0.5) * twinkle * (0.8 + vScale * 0.4);
        
        gl_FragColor = vec4(fireColor, alpha);
        if (gl_FragColor.a < 0.1) discard;
    }
`;
