import React, { useEffect } from 'react';
import { useState } from 'react';
import { Button, message, Space } from 'antd';


import * as THREE from 'three';
// import * as dat from 'dat.gui'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { ModalForm, ProCard, ProForm, ProFormDateRangePicker, ProFormSelect, ProFormText } from '@ant-design/pro-components';
import { PlusOutlined } from '@ant-design/icons';

// import './style.css'

function ThreeJS() {
    const [modalVisit, setModalVisit] = useState(false);
    useEffect(() => {
        // Inisialisasi scene, camera, dan renderer Three.js
        const scene = new THREE.Scene();

        // Set latar belakang scene menjadi warna putih
        scene.background = new THREE.Color(0xffffff);

        const camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 1, 50000);
        camera.position.set(8000, 7000, 10000)

        const renderer = new THREE.WebGLRenderer();

        // Tambahkan renderer ke elemen DOM dan atur ukuran renderer
        const container = document.getElementById('container');
        container.appendChild(renderer.domElement);
        renderer.setSize(container.clientWidth, container.clientHeight);

        // BOX
        const geometry = new THREE.BoxGeometry(600, 1890, 1200, 30, 30, 30);
        const material = new THREE.MeshBasicMaterial({
            color: 0x000000,
            wireframe: true
        });
        const cube = new THREE.Mesh(geometry, material);
        cube.position.set(10, 1890 / 2, 10)
        scene.add(cube);
        //





        // ========CONTROLS=======
        const controls = new OrbitControls(camera, renderer.domElement)


        const helper = new THREE.GridHelper(10000, 60)
        helper.position.y = 0;
        helper.material.opacity = 0.5;
        helper.material.transparent = true;
        scene.add(helper);

        // ==========GUI==========

        // const gui = new dat.GUI()

        // =======================



        // Fungsi animasi
        const animate = () => {
            requestAnimationFrame(animate);

            // Rotasi objek cube
            // cube.rotation.x += 0.01;
            // cube.rotation.y += 0.01;

            // Render scene
            renderer.render(scene, camera);
        };

        // Fungsi untuk menangani perubahan ukuran jendela
        const handleResize = () => {
            const newWidth = container.clientWidth;
            const newHeight = container.clientHeight;

            // Sesuaikan ukuran kamera dan renderer
            camera.aspect = newWidth / newHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(newWidth, newHeight);
        };

        // Tambahkan event listener untuk perubahan ukuran jendela
        window.addEventListener('resize', handleResize);

        // Panggil fungsi animate
        animate();

        // Hapus event listener saat komponen dibongkar
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div>

            <ProCard bordered style={{ marginBottom: '10px' }}
                extra={[
                    <Button
                        type="primary"
                        onClick={() => {
                            setModalVisit(true);
                        }}
                    >
                        <PlusOutlined />
                        Tambah Perangkat
                    </Button>
                ]}
            >
            </ProCard>
            <div id="gui-container" className="gui-container" />
            <div id="container" style={{ width: '100%', height: '75vh' }} />

            <ModalForm
                title="Tambah Perangkat"
                open={modalVisit}
                onFinish={async () => {
                    message.success('Berhasi ditambahkan');
                    return true;
                }}
                onOpenChange={setModalVisit}
            >
                <ProForm.Group>
                    <ProFormText
                        name="device"
                        width="md"
                        label="Nama Perangkat"
                        tooltip="Nama Perangkat harus yang benar"
                        placeholder="Isikan nama perangkat"
                    />
                </ProForm.Group>
                <ProForm.Group>
                    <ProFormText
                        width="sm"
                        name="x"
                        label="Ukuran (lebar)"
                        placeholder="Isikan ukuran perangkat"
                    />
                    <ProFormText
                        width="sm"
                        name="y"
                        label="Ukuran (tinggi)"
                        placeholder="Isikan ukuran perangkat"
                    />
                    <ProFormText
                        width="sm"
                        name="z"
                        label="Ukuran (depth)"
                        placeholder="Isikan ukuran perangkat"
                    />
                </ProForm.Group>
            </ModalForm>
        </div>
    )
}

export default ThreeJS;
