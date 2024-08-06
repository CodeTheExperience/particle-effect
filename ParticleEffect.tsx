import React, { useEffect, useRef } from "react"
import { addPropertyControls, ControlType } from "framer"

interface ParticleProps {
    x: number
    y: number
    effect: Effect
}

class Particle {
    originX: number
    originY: number
    effect: Effect
    x: number
    y: number
    ctx: CanvasRenderingContext2D
    vx: number = 0
    vy: number = 0
    ease: number = 0.03
    friction: number = 0.98
    distanceFromMouse: number = 0
    force: number = 0
    angle: number = 0
    size: number
    pushFactor: number = 0.02
    rippleStrength: number = 0.005
    color: string = "gray"

    constructor({ x, y, effect }: ParticleProps) {
        this.originX = this.x = Math.floor(x)
        this.originY = this.y = Math.floor(y)
        this.effect = effect
        this.ctx = this.effect.ctx
        this.size = Math.random() * 1.5 + 0.5
    }

    draw() {
        this.ctx.fillStyle = this.color
        this.ctx.beginPath()
        this.ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        this.ctx.fill()
    }

    update() {
        const dx = this.effect.mouse.x - this.x
        const dy = this.effect.mouse.y - this.y
        this.distanceFromMouse = Math.sqrt(dx * dx + dy * dy)
        this.force = Math.max(
            this.effect.mouse.radius - this.distanceFromMouse,
            0
        )

        if (this.distanceFromMouse < this.effect.mouse.radius) {
            this.angle = Math.atan2(dy, dx)
            this.vx -=
                ((Math.cos(this.angle) * this.force) / this.distanceFromMouse) *
                this.rippleStrength
            this.vy -=
                ((Math.sin(this.angle) * this.force) / this.distanceFromMouse) *
                this.rippleStrength
        }

        this.x += this.vx
        this.y += this.vy

        this.vx *= this.friction
        this.vy *= this.friction

        // Return to original position
        this.x += (this.originX - this.x) * this.ease
        this.y += (this.originY - this.y) * this.ease

        this.draw()
    }

    explode() {
        this.vx = (Math.random() - 0.5) * 10
        this.vy = (Math.random() - 0.5) * 10
        this.color = `hsl(${Math.random() * 360}, 100%, 50%)`
    }
}

interface Mouse {
    radius: number
    x: number
    y: number
}

class Effect {
    width: number
    height: number
    ctx: CanvasRenderingContext2D
    particlesArray: Particle[] = []
    gap: number = 20
    mouse: Mouse = {
        radius: 3000,
        x: 0,
        y: 0,
    }

    constructor(width: number, height: number, ctx: CanvasRenderingContext2D) {
        this.width = width
        this.height = height
        this.ctx = ctx
        this.init()
    }

    init() {
        this.particlesArray = []
        for (let y = 0; y < this.height; y += this.gap) {
            for (let x = 0; x < this.width; x += this.gap) {
                this.particlesArray.push(new Particle({ x, y, effect: this }))
            }
        }
    }

    update() {
        this.ctx.clearRect(0, 0, this.width, this.height)
        for (let i = 0; i < this.particlesArray.length; i++) {
            this.particlesArray[i].update()
        }
    }

    explodeParticles(x: number, y: number, radius: number) {
        for (let particle of this.particlesArray) {
            const dx = particle.x - x
            const dy = particle.y - y
            const distance = Math.sqrt(dx * dx + dy * dy)
            if (distance < radius) {
                particle.explode()
            }
        }
    }
}

interface ParticleEffectProps {
    particleGap: number
    mouseRadius: number
    rippleStrength: number
    children: React.ReactNode
}

export function ParticleEffect({
    particleGap,
    mouseRadius,
    rippleStrength,
    children,
}: ParticleEffectProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const effectRef = useRef<Effect | null>(null)
    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext("2d")
        if (!ctx) return

        const updateCanvasSize = () => {
            canvas.width = window.innerWidth * window.devicePixelRatio
            canvas.height = window.innerHeight * window.devicePixelRatio
            canvas.style.width = `${window.innerWidth}px`
            canvas.style.height = `${window.innerHeight}px`
        }

        updateCanvasSize()

        effectRef.current = new Effect(canvas.width, canvas.height, ctx)
        effectRef.current.gap = particleGap
        effectRef.current.mouse.radius = mouseRadius

        const handleMouseMove = (e: MouseEvent) => {
            if (effectRef.current) {
                effectRef.current.mouse.x = e.clientX * window.devicePixelRatio
                effectRef.current.mouse.y = e.clientY * window.devicePixelRatio
            }
        }

        const handleClick = (e: MouseEvent) => {
            if (effectRef.current) {
                effectRef.current.explodeParticles(
                    e.clientX * window.devicePixelRatio,
                    e.clientY * window.devicePixelRatio,
                    150
                )
            }
        }

        const handleResize = () => {
            updateCanvasSize()
            if (effectRef.current) {
                effectRef.current.width = canvas.width
                effectRef.current.height = canvas.height
                effectRef.current.init()
            }
        }

        window.addEventListener("mousemove", handleMouseMove)
        window.addEventListener("click", handleClick)
        window.addEventListener("resize", handleResize)

        const animate = () => {
            if (effectRef.current) {
                effectRef.current.update()
            }
            requestAnimationFrame(animate)
        }

        animate()

        return () => {
            window.removeEventListener("mousemove", handleMouseMove)
            window.removeEventListener("click", handleClick)
            window.removeEventListener("resize", handleResize)
        }
    }, [particleGap, mouseRadius, rippleStrength])

    return (
        <div
            ref={containerRef}
            style={{
                overflow: "hidden",
                height: "100%",
                position: "relative",
                backgroundColor: "#F7F7F8",
            }}
        >
            <canvas
                ref={canvasRef}
                style={{ position: "absolute", top: 0, left: 0 }}
            />
            {children}
        </div>
    )
}

addPropertyControls(ParticleEffect, {
    particleGap: {
        type: ControlType.Number,
        defaultValue: 20,
        min: 10,
        max: 50,
        step: 1,
        title: "Particle Gap",
    },
    mouseRadius: {
        type: ControlType.Number,
        defaultValue: 3000,
        min: 1000,
        max: 5000,
        step: 100,
        title: "Mouse Radius",
    },
    rippleStrength: {
        type: ControlType.Number,
        defaultValue: 5,
        min: 1,
        max: 20,
        step: 1,
        title: "Ripple Strength",
    },
})
