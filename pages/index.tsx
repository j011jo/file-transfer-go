// pages/index.tsx
import Head from 'next/head'

export default function Home() {
  return (
    <>
      <Head>
        <title>文件快传工具</title>
        <meta name="description" content="安全、快速、简单的点对点文件传输解决方案" />
      </Head>
      <main className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        <h1 className="text-4xl font-bold mb-4">欢迎使用 File Transfer Go</h1>
        <p className="text-lg text-gray-600">无需注册，即传即用</p>
      </main>
    </>
  )
}
