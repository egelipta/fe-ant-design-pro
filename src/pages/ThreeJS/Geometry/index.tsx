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

        // Set latar belakang scene menjadi warnaRack putih
        scene.background = new THREE.Color(0x0f3470);

        const camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 1, 50000);
        camera.position.set(8000, 7000, 10000)

        const renderer = new THREE.WebGLRenderer();

        // Tambahkan renderer ke elemen DOM dan atur ukuran renderer
        const container = document.getElementById('container');
        container.appendChild(renderer.domElement);
        renderer.setSize(container.clientWidth, container.clientHeight);

        // alas
        const geometry1 = new THREE.BoxGeometry(600, 30, 1200);
        const material1 = new THREE.MeshBasicMaterial({
            color: 0x94cdff,
            transparent: true,
            opacity: 0.3
        });
        const cube1 = new THREE.Mesh(geometry1, material1);
        cube1.position.set(0, 30 / 2, 0)
        scene.add(cube1);

        // atap
        const geometry2 = new THREE.BoxGeometry(600, 30, 1200);
        const material2 = new THREE.MeshBasicMaterial({
            color: 0x94cdff,
            transparent: true,
            opacity: 0.3
        });
        const cube2 = new THREE.Mesh(geometry2, material2);
        cube2.position.set(0, 1890 - (30 / 2), 0)
        scene.add(cube2);

        // kiri
        const geometry3 = new THREE.BoxGeometry(20, 1890, 1200);
        const material3 = new THREE.MeshBasicMaterial({
            color: 0x94cdff,
            transparent: true,
            opacity: 0.3
        });
        const cube3 = new THREE.Mesh(geometry3, material3);
        cube3.position.set(600 / 2 * -1 - (20 / 2), 1890 / 2, 0)
        scene.add(cube3);

        // Kanan
        const geometry4 = new THREE.BoxGeometry(20, 1890, 1200);
        const material4 = new THREE.MeshBasicMaterial({
            color: 0x94cdff,
            transparent: true,
            opacity: 0.3
        });
        const cube4 = new THREE.Mesh(geometry4, material4);
        cube4.position.set(600 / 2 * 1 + (20 / 2), 1890 / 2, 0)
        scene.add(cube4);


        // // ==========RACK==========
        // const warnaRack = 0x000000;

        // const widthRack1 = 600;
        // const widthRack2 = 800;
        // const heightRack1 = 45 * 42;
        // const heightRack2 = 45 * 45;
        // const depthRack1 = 1200;
        // const depthRack2 = 1000;

        // const dataRack = [
        //     {
        //         name: "RACK 1",
        //         position: {
        //             x: 0,
        //             y: heightRack1 / 2,
        //             z: 1200 / 2 + (1200 - depthRack1) / 2,
        //         },
        //         size: {
        //             width: widthRack1,
        //             height: heightRack1,
        //             depth: depthRack1,
        //             widthSegments: 50,
        //             heightSegments: 50,
        //             depthSegments: 50,
        //         },
        //         material: {
        //             colors: {
        //                 right: warnaRack,
        //                 left: warnaRack,
        //                 top: warnaRack,
        //                 bottom: warnaRack,
        //                 front: warnaRack,
        //                 back: warnaRack,
        //             },
        //             wireframe: {
        //                 right: true,
        //                 left: true,
        //                 top: true,
        //                 bottom: true,
        //                 front: false,
        //                 back: false,
        //             },
        //         },
        //     },
        //     {
        //         name: "RACK 2",
        //         position: {
        //             x: widthRack2 / 2 + 600 / 2,
        //             y: heightRack2 / 2,
        //             z: 1200 / 2 + (1200 - depthRack2) / 2,
        //         },
        //         size: {
        //             width: widthRack2,
        //             height: heightRack2,
        //             depth: depthRack2,
        //             widthSegments: 50,
        //             heightSegments: 50,
        //             depthSegments: 50,
        //         },
        //         material: {
        //             colors: {
        //                 right: warnaRack,
        //                 left: warnaRack,
        //                 top: warnaRack,
        //                 bottom: warnaRack,
        //                 front: warnaRack,
        //                 back: warnaRack,
        //             },
        //             wireframe: {
        //                 right: true,
        //                 left: true,
        //                 top: true,
        //                 bottom: true,
        //                 front: false,
        //                 back: false,
        //             },
        //         },
        //     },

        // ];

        // const cubesRack = [];

        // for (const data of dataRack) {
        //     const geometry = new THREE.BoxGeometry(
        //         data.size.width,
        //         data.size.height,
        //         data.size.depth,
        //         data.size.widthSegments,
        //         data.size.heightSegments,
        //         data.size.depthSegments,
        //     );

        //     const materials = [
        //         new THREE.MeshBasicMaterial({ color: data.material.colors.right, wireframe: data.material.wireframe.right }), // Right
        //         new THREE.MeshBasicMaterial({ color: data.material.colors.left, wireframe: data.material.wireframe.left }), // Left
        //         new THREE.MeshBasicMaterial({ color: data.material.colors.top, wireframe: data.material.wireframe.top }), // Top
        //         new THREE.MeshBasicMaterial({ color: data.material.colors.bottom, wireframe: data.material.wireframe.bottom }), // Bottom
        //         new THREE.MeshBasicMaterial({ color: data.material.colors.front, transparent: true, opacity: 0 }), // Front
        //         new THREE.MeshBasicMaterial({ color: data.material.colors.back, transparent: true, opacity: 0 }), // Back
        //     ];

        //     const cubeRack = new THREE.Mesh(geometry, materials);
        //     cubeRack.position.set(data.position.x, data.position.y, data.position.z);
        //     cubeRack.name = data.name;

        //     scene.add(cubeRack);
        //     cubesRack.push(cubeRack);
        // }

        // console.table(cubesRack);
        // // =======================







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

            {/* <ProCard bordered style={{ marginBottom: '10px' }}
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
            </ProCard> */}
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
