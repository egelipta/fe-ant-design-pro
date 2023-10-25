import React, { useEffect } from 'react';
import * as THREE from 'three';
import * as dat from 'dat.gui'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import './style.css'
import { PageContainer } from '@ant-design/pro-components';

function ThreeJS() {
    useEffect(() => {
        // Inisialisasi scene, camera, dan renderer Three.js
        const scene = new THREE.Scene();

        // Set latar belakang scene
        scene.background = new THREE.Color(0x0f3470);

        const camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 1, 50000);
        camera.position.set(8000, 7000, 10000)

        const renderer = new THREE.WebGLRenderer();

        // Tambahkan renderer ke elemen DOM dan atur ukuran renderer
        const container = document.getElementById('container');
        container.appendChild(renderer.domElement);
        renderer.setSize(container.clientWidth, container.clientHeight);

        const cubesRack = []
        let originalCubeColorRack = 0
        let selectedCubeRack = null


        function createRack(scene, xOffset) {
            // alas
            const geometryAlas = new THREE.BoxGeometry(600, 30, 1200);
            const materialAlas = new THREE.MeshBasicMaterial({
                color: 0x93c3ed,
                opacity: 0.4,
                transparent: true
            });
            const cubeAlas = new THREE.Mesh(geometryAlas, materialAlas);
            cubeAlas.position.set(xOffset, 30 / 2, 1200 / 2 + (1200 - 1200) / 2);
            cubesRack.push(cubeAlas);
            scene.add(cubeAlas);

            // atap
            const geometryAtap = new THREE.BoxGeometry(600, 30, 1200);
            const materialAtap = new THREE.MeshBasicMaterial({
                color: 0x93c3ed,
                opacity: 0.4,
                transparent: true
            });
            const cubeAtap = new THREE.Mesh(geometryAtap, materialAtap);
            cubeAtap.position.set(xOffset, 1890 - (30 / 2), 1230 / 2 + (1200 - 1200) / 2);
            cubesRack.push(cubeAtap)
            scene.add(cubeAtap);

            // kiri
            const geometryKiri = new THREE.BoxGeometry(20, 1890, 1200);
            const materialKiri = new THREE.MeshBasicMaterial({
                color: 0x93c3ed,
                opacity: 0.4,
                transparent: true
            });
            const cubeKiri = new THREE.Mesh(geometryKiri, materialKiri);
            cubeKiri.position.set(xOffset - 600 / 2 - 20 / 2, 1890 / 2, 1200 / 2 + (1200 - 1200) / 2);
            cubesRack.push(cubeKiri)
            scene.add(cubeKiri);

            // Kanan
            const geometryKanan = new THREE.BoxGeometry(20, 1890, 1200);
            const materialKanan = new THREE.MeshBasicMaterial({
                color: 0x93c3ed,
                opacity: 0.4,
                transparent: true
            });
            const cubeKanan = new THREE.Mesh(geometryKanan, materialKanan);
            cubeKanan.position.set(xOffset + 600 / 2 + 20 / 2, 1890 / 2, 1200 / 2 + (1200 - 1200) / 2);
            cubesRack.push(cubeKanan)
            scene.add(cubeKanan);

            // ========MOUSEMOVE=========
            document.addEventListener('mousemove', (event) => {
                console.log('ada hover Rak')
                // Mendapatkan posisi mouse dalam koordinat normalized device coordinates (NDC)
                // mouse.x = (event.clientX / window.innerWidth) * 2 - 1
                // mouse.y = -(event.clientY / window.innerHeight) * 2 + 1

                const rect = renderer.domElement.getBoundingClientRect();

                mouse.x = ((event.clientX - rect.left) / (rect.right - rect.left)) * 2 - 1;
                mouse.y = - ((event.clientY - rect.top) / (rect.bottom - rect.top)) * 2 + 1;



                // Lakukan raycasting untuk mendeteksi objek yang disorot oleh kursor
                raycaster.setFromCamera(mouse, camera)

                const intersects = raycaster.intersectObjects(cubesRack)
                console.log('jumlah cube : ', intersects.length)

                // // Kembalikan warna cubeDevice yang sebelumnya diklik
                // if (selectedCubeRack) {
                //     selectedCubeRack.material[4].color.setHex(originalCubeColorRack)
                //     selectedCubeRack.material[3].color.setHex(warnaDevice)
                //     selectedCubeRack = null
                // }

                if (intersects.length > 0) {
                    console.log(intersects[0].point.x, intersects[0].point.y)
                    const hoveredObject = intersects[0].object as THREE.Mesh
                    const hoveredIndex = hoveredObject.userData.id

                    // Simpan warna asli cubeDevice yang diklik
                    // originalCubeColorRack = hoveredObject.material[0].color.getHex()
                    // hoveredObject.material

                    // ----------------------------------
                    // if (hoveredObject.material.length > 0){
                    //     console.log('Material: ', hoveredObject.material.color)
                    // }


                    // originalCubeColor = hoveredObject.material[3].color.getHex()

                    // Ubah warna cubeDevice yang diklik
                    // hoveredObject.material[4].color.set(0x0a8afa) // Misalnya, ubah warna saat hover

                    // hoveredObject.material[0].color.set(0x0a8afa) // Misalnya, ubah warna saat hover

                    selectedCubeRack = hoveredObject
                    // Cari objek dengan ID yang sesuai dalam array dataDevice
                    const foundObject = dataDevice.find((item) => item.id === hoveredIndex)

                    if (foundObject) {
                        // Jika objek ditemukan, perbarui nilai variabel-variabel di GUI
                        guiData.ID = hoveredIndex
                        guiData.Name = foundObject.name
                        guiData.Instansi = foundObject.instansi
                    }
                } else {
                    // Reset nilai jika tidak ada objek yang disorot
                    guiData.ID = ''
                    guiData.Name = ''
                    guiData.Instansi = ''
                }
            })
        }

        // Loop untuk membuat tiga rak dengan jarak 1500 antara masing-masing
        for (let i = 0; i < 5; i++) {
            createRack(scene, i * 650);
        }


        // function rack2(scene) {
        //     // alas
        //     const geometryAlas = new THREE.BoxGeometry(600, 30, 1200);
        //     const materialAlas = new THREE.MeshBasicMaterial({
        //         color: 0xffffff,
        //         opacity: 0.6,
        //         transparent: true
        //     });
        //     const cubeAlas = new THREE.Mesh(geometryAlas, materialAlas);
        //     cubeAlas.position.set(800, 30 / 2, 1200 / 2 + (1200 - 1200) / 2)
        //     scene.add(cubeAlas);

        //     // atap
        //     const geometryAtap = new THREE.BoxGeometry(600, 30, 1200);
        //     const materialAtap = new THREE.MeshBasicMaterial({
        //         color: 0xffffff,
        //         opacity: 0.6,
        //         transparent: true
        //     });
        //     const cubeAtap = new THREE.Mesh(geometryAtap, materialAtap);
        //     cubeAtap.position.set(800, 1890 - (30 / 2), 1200 / 2 + (1200 - 1200) / 2)
        //     scene.add(cubeAtap);

        //     // kiri
        //     const geometryKiri = new THREE.BoxGeometry(20, 1890, 1200);
        //     const materialKiri = new THREE.MeshBasicMaterial({
        //         color: 0xffffff,
        //         opacity: 0.6,
        //         transparent: true
        //     });
        //     const cubeKiri = new THREE.Mesh(geometryKiri, materialKiri);
        //     cubeKiri.position.set(-1000 / 2 * -1 - (20 / 2), 1890 / 2, 1200 / 2 + (1200 - 1200) / 2)
        //     scene.add(cubeKiri);

        //     // Kanan
        //     const geometryKanan = new THREE.BoxGeometry(20, 1890, 1200);
        //     const materialKanan = new THREE.MeshBasicMaterial({
        //         color: 0xffffff,
        //         opacity: 0.6,
        //         transparent: true
        //     });
        //     const cubeKanan = new THREE.Mesh(geometryKanan, materialKanan);
        //     cubeKanan.position.set(2200 / 2 * 1 + (20 / 2), 1890 / 2, 1200 / 2 + (1200 - 1200) / 2)
        //     scene.add(cubeKanan);
        // }
        // rack2(scene);




        // // ==========RACK==========
        // const posLeftRightRack = 0
        // const posTopBottomRack = 1900 / 2 // 1890 / 2
        // const posFrontBackRack = 1200 / 2 + (1200 - 1200) / 2 // tadinya -600
        // const warnaRack = 0xe6c58c // hitam

        // const geometryRack = new THREE.BoxGeometry(600, 1900, 1200);
        // const materialRack = new THREE.MeshBasicMaterial({
        //     color: warnaRack,
        //     transparent: true,
        //     opacity: 0.8,
        // })

        // const pintu = new THREE.MeshBasicMaterial({
        //     color: 0x0a0a0a,
        //     transparent: true,
        //     opacity: 0,
        // })
        // const materialsRack = [
        //     materialRack, // Right
        //     materialRack, // Left
        //     materialRack, // Top
        //     materialRack, // Bottom
        //     pintu, // Front
        //     pintu, // Back
        // ]
        // const cubeRack = new THREE.Mesh(geometryRack, materialsRack)
        // cubeRack.position.set(posLeftRightRack, posTopBottomRack, posFrontBackRack)
        // scene.add(cubeRack)

        // // garis tepi (outline) untuk rack
        // const edgesRack = new THREE.EdgesGeometry(geometryRack)
        // const outlineMaterialRack = new THREE.LineBasicMaterial({
        //     color: 0xffffff, // Warna hitam
        //     opacity: 0.05,
        //     linewidth: 0,
        // })
        // const outlineRack = new THREE.LineSegments(edgesRack, outlineMaterialRack)

        // cubeRack.add(outlineRack)
        // // =======================

        // // ==========RACK 2==========
        // const posLeftRightRack2 = 800 / 2 + 600 / 2
        // const posTopBottomRack2 = (45 * 45) / 2 // tadinya 755
        // const posFrontBackRack2 = 1200 / 2 + (1200 - 1000) / 2 // tadinya -600
        // const warnaRack2 = 0x000000 // hitam

        // const geometryRack2 = new THREE.BoxGeometry(800, 45 * 45, 1000)
        // const materialRack2 = new THREE.MeshBasicMaterial({
        //     color: warnaRack2,
        //     transparent: true,
        //     opacity: 0.8,
        // })

        // const materialsRack2 = [
        //     materialRack2, // Right
        //     materialRack2, // Left
        //     materialRack2, // Top
        //     materialRack2, // Bottom
        //     pintu, // Front
        //     pintu, // Back
        // ]
        // const cubeRack2 = new THREE.Mesh(geometryRack2, materialsRack2)
        // cubeRack2.position.set(posLeftRightRack2, posTopBottomRack2, posFrontBackRack2)
        // scene.add(cubeRack2)

        // // garis tepi (outline) untuk rack2
        // const edgesRack2 = new THREE.EdgesGeometry(geometryRack2)
        // const outlineMaterialRack2 = new THREE.LineBasicMaterial({
        //     color: 0x000000, // Warna hitam
        //     linewidth: 1,
        // })
        // const outlineRack2 = new THREE.LineSegments(edgesRack2, outlineMaterialRack2)

        // cubeRack2.add(outlineRack2)
        // // ==========================

        // ==========DEVICE==========
        const textureLoader = new THREE.TextureLoader()
        const warnaDevice = 0x424242 // Warna abu-abu
        const satuanU = 45

        const tinggi1U = 1
        const tinggi2U = 2
        const tinggi4U = 4

        const panjangDevice = 1000 //562
        const lebarDevice = 482

        const posU = [0]
        for (let i = 1; i <= 45; i++) {
            posU.push(i)
        }

        const mouse = new THREE.Vector2()
        const raycaster = new THREE.Raycaster()
        const cubes = []

        // Membuat array data dengan konfigurasi untuk 5 cubeDevice
        const dataDevice = [
            {
                id: 1,
                name: `Device1 U${posU[2]} Rack1`,
                instansi: 'Dinas Kesehatan',
                geometryDevice: new THREE.BoxGeometry(lebarDevice, satuanU * tinggi2U, panjangDevice),
                posLeftRightDev: 0,
                posTopBottomDev: posU[2] * satuanU - (tinggi2U * satuanU) / 2,
                posFrontBackDev: 1200 / 2 + (1200 - panjangDevice) / 2,
                texturePath: '/images/server1.png',
            },
            {
                id: 2,
                name: `Device2 U${posU[3]} Rack1`,
                instansi: 'Dinas Sosial',
                geometryDevice: new THREE.BoxGeometry(lebarDevice, satuanU * tinggi1U, panjangDevice),
                posLeftRightDev: 0, //800 / 2 + 600 / 2,
                // (occupied + tinggiU) * satuanU + (satuanU/2)
                posTopBottomDev: posU[3] * satuanU - (tinggi1U * satuanU) / 2,
                posFrontBackDev: 1200 / 2 + (1200 - panjangDevice) / 2,
                texturePath: '/images/server4.jpg',
            },
            {
                id: 3,
                name: `Device3 U${posU[4]} Rack1`,
                instansi: 'Dinas Sosial',
                geometryDevice: new THREE.BoxGeometry(lebarDevice, satuanU * tinggi1U, panjangDevice),
                posLeftRightDev: 0, //800 / 2 + 600 / 2,
                // (occupied + tinggiU) * satuanU + (satuanU/2)
                posTopBottomDev: posU[4] * satuanU - (tinggi1U * satuanU) / 2,
                posFrontBackDev: 1200 / 2 + (1200 - panjangDevice) / 2,
                texturePath: '/images/server4.jpg',
            },
            {
                id: 4,
                name: `Device4 U${posU[6]} Rack1`,
                instansi: 'Dinas Kesehatan',
                geometryDevice: new THREE.BoxGeometry(lebarDevice, satuanU * tinggi2U, panjangDevice),
                posLeftRightDev: 0,
                posTopBottomDev: posU[6] * satuanU - (tinggi2U * satuanU) / 2,
                posFrontBackDev: 1200 / 2 + (1200 - panjangDevice) / 2,
                texturePath: '/images/server1.png',
            },
            {
                id: 5,
                name: `Device5 U${posU[8]} Rack1`,
                instansi: 'Dinas Kesehatan',
                geometryDevice: new THREE.BoxGeometry(lebarDevice, satuanU * tinggi2U, panjangDevice),
                posLeftRightDev: 0,
                posTopBottomDev: posU[8] * satuanU - (tinggi2U * satuanU) / 2,
                posFrontBackDev: 1200 / 2 + (1200 - panjangDevice) / 2,
                texturePath: '/images/server2.jpg',
            },
            {
                id: 6,
                name: `Device6 U${posU[10]} Rack1`,
                instansi: 'Dinas Kesehatan',
                geometryDevice: new THREE.BoxGeometry(lebarDevice, satuanU * tinggi2U, panjangDevice),
                posLeftRightDev: 0,
                posTopBottomDev: posU[10] * satuanU - (tinggi2U * satuanU) / 2,
                posFrontBackDev: 1200 / 2 + (1200 - panjangDevice) / 2,
                texturePath: '/images/server1.png',
            },
            {
                id: 7,
                name: `Device6 U${posU[12]} Rack1`,
                instansi: 'Dinas Kesehatan',
                geometryDevice: new THREE.BoxGeometry(lebarDevice, satuanU * tinggi2U, panjangDevice),
                posLeftRightDev: 0,
                posTopBottomDev: posU[12] * satuanU - (tinggi2U * satuanU) / 2,
                posFrontBackDev: 1200 / 2 + (1200 - panjangDevice) / 2,
                texturePath: '/images/server1.png',
            },
            {
                id: 8,
                name: `Device6 U${posU[14]} Rack1`,
                instansi: 'Dinas Kesehatan',
                geometryDevice: new THREE.BoxGeometry(lebarDevice, satuanU * tinggi2U, panjangDevice),
                posLeftRightDev: 0,
                posTopBottomDev: posU[14] * satuanU - (tinggi2U * satuanU) / 2,
                posFrontBackDev: 1200 / 2 + (1200 - panjangDevice) / 2,
                texturePath: '/images/server1.png',
            },
            {
                id: 9,
                name: `Device6 U${posU[16]} Rack1`,
                instansi: 'Dinas Kesehatan',
                geometryDevice: new THREE.BoxGeometry(lebarDevice, satuanU * tinggi2U, panjangDevice),
                posLeftRightDev: 0,
                posTopBottomDev: posU[16] * satuanU - (tinggi2U * satuanU) / 2,
                posFrontBackDev: 1200 / 2 + (1200 - panjangDevice) / 2,
                texturePath: '/images/server1.png',
            },
            {
                id: 10,
                name: `Device6 U${posU[18]} Rack1`,
                instansi: 'Dinas Kesehatan',
                geometryDevice: new THREE.BoxGeometry(lebarDevice, satuanU * tinggi2U, panjangDevice),
                posLeftRightDev: 0,
                posTopBottomDev: posU[18] * satuanU - (tinggi2U * satuanU) / 2,
                posFrontBackDev: 1200 / 2 + (1200 - panjangDevice) / 2,
                texturePath: '/images/server1.png',
            },
            {
                id: 11,
                name: `Device6 U${posU[19]} Rack1`,
                instansi: 'Dinas Kesehatan',
                geometryDevice: new THREE.BoxGeometry(lebarDevice, satuanU * tinggi1U, panjangDevice),
                posLeftRightDev: 0,
                posTopBottomDev: posU[19] * satuanU - (tinggi1U * satuanU) / 2,
                posFrontBackDev: 1200 / 2 + (1200 - panjangDevice) / 2,
                texturePath: '/images/server5.jpg',
            },
            {
                id: 12,
                name: `Device6 U${posU[21]} Rack1`,
                instansi: 'Dinas Kesehatan',
                geometryDevice: new THREE.BoxGeometry(lebarDevice, satuanU * tinggi2U, panjangDevice),
                posLeftRightDev: 0,
                posTopBottomDev: posU[21] * satuanU - (tinggi2U * satuanU) / 2,
                posFrontBackDev: 1200 / 2 + (1200 - panjangDevice) / 2,
                texturePath: '/images/server1.png',
            },
            {
                id: 13,
                name: `Device6 U${posU[23]} Rack1`,
                instansi: 'Dinas Kesehatan',
                geometryDevice: new THREE.BoxGeometry(lebarDevice, satuanU * tinggi2U, panjangDevice),
                posLeftRightDev: 0,
                posTopBottomDev: posU[23] * satuanU - (tinggi2U * satuanU) / 2,
                posFrontBackDev: 1200 / 2 + (1200 - panjangDevice) / 2,
                texturePath: '/images/server1.png',
            },
            {
                id: 14,
                name: `Device6 U${posU[25]} Rack1`,
                instansi: 'Dinas Kesehatan',
                geometryDevice: new THREE.BoxGeometry(lebarDevice, satuanU * tinggi2U, panjangDevice),
                posLeftRightDev: 0,
                posTopBottomDev: posU[25] * satuanU - (tinggi2U * satuanU) / 2,
                posFrontBackDev: 1200 / 2 + (1200 - panjangDevice) / 2,
                texturePath: '/images/server1.png',
            },
            {
                id: 15,
                name: `Device6 U${posU[27]} Rack1`,
                instansi: 'Dinas Kesehatan',
                geometryDevice: new THREE.BoxGeometry(lebarDevice, satuanU * tinggi2U, panjangDevice),
                posLeftRightDev: 0,
                posTopBottomDev: posU[27] * satuanU - (tinggi2U * satuanU) / 2,
                posFrontBackDev: 1200 / 2 + (1200 - panjangDevice) / 2,
                texturePath: '/images/server1.png',
            },
            {
                id: 16,
                name: `Device6 U${posU[29]} Rack1`,
                instansi: 'Dinas Kesehatan',
                geometryDevice: new THREE.BoxGeometry(lebarDevice, satuanU * tinggi2U, panjangDevice),
                posLeftRightDev: 0,
                posTopBottomDev: posU[29] * satuanU - (tinggi2U * satuanU) / 2,
                posFrontBackDev: 1200 / 2 + (1200 - panjangDevice) / 2,
                texturePath: '/images/server1.png',
            },
            {
                id: 17,
                name: `Device6 U${posU[31]} Rack1`,
                instansi: 'Dinas Kesehatan',
                geometryDevice: new THREE.BoxGeometry(lebarDevice, satuanU * tinggi2U, panjangDevice),
                posLeftRightDev: 0,
                posTopBottomDev: posU[31] * satuanU - (tinggi2U * satuanU) / 2,
                posFrontBackDev: 1200 / 2 + (1200 - panjangDevice) / 2,
                texturePath: '/images/server1.png',
            },
            {
                id: 18,
                name: `Device6 U${posU[33]} Rack1`,
                instansi: 'Dinas Kesehatan',
                geometryDevice: new THREE.BoxGeometry(lebarDevice, satuanU * tinggi2U, panjangDevice),
                posLeftRightDev: 0,
                posTopBottomDev: posU[33] * satuanU - (tinggi2U * satuanU) / 2,
                posFrontBackDev: 1200 / 2 + (1200 - panjangDevice) / 2,
                texturePath: '/images/server1.png',
            },
            {
                id: 19,
                name: `Device6 U${posU[35]} Rack1`,
                instansi: 'Dinas Kesehatan',
                geometryDevice: new THREE.BoxGeometry(lebarDevice, satuanU * tinggi2U, panjangDevice),
                posLeftRightDev: 0,
                posTopBottomDev: posU[35] * satuanU - (tinggi2U * satuanU) / 2,
                posFrontBackDev: 1200 / 2 + (1200 - panjangDevice) / 2,
                texturePath: '/images/server1.png',
            },
            {
                id: 20,
                name: `Device6 U${posU[37]} Rack1`,
                instansi: 'Dinas Kesehatan',
                geometryDevice: new THREE.BoxGeometry(lebarDevice, satuanU * tinggi2U, panjangDevice),
                posLeftRightDev: 0,
                posTopBottomDev: posU[37] * satuanU - (tinggi2U * satuanU) / 2,
                posFrontBackDev: 1200 / 2 + (1200 - panjangDevice) / 2,
                texturePath: '/images/server1.png',
            },
            {
                id: 21,
                name: `Device6 U${posU[39]} Rack1`,
                instansi: 'Dinas Kesehatan',
                geometryDevice: new THREE.BoxGeometry(lebarDevice, satuanU * tinggi2U, panjangDevice),
                posLeftRightDev: 0,
                posTopBottomDev: posU[39] * satuanU - (tinggi2U * satuanU) / 2,
                posFrontBackDev: 1200 / 2 + (1200 - panjangDevice) / 2,
                texturePath: '/images/server1.png',
            },
            {
                id: 22,
                name: `Device6 U${posU[41]} Rack1`,
                instansi: 'Dinas Kesehatan',
                geometryDevice: new THREE.BoxGeometry(lebarDevice, satuanU * tinggi2U, panjangDevice),
                posLeftRightDev: 0,
                posTopBottomDev: posU[41] * satuanU - (tinggi2U * satuanU) / 2,
                posFrontBackDev: 1200 / 2 + (1200 - panjangDevice) / 2,
                texturePath: '/images/server1.png',
            },
            {
                id: 23,
                name: `Device6 U${posU[42]} Rack1`,
                instansi: 'Dinas Kesehatan',
                geometryDevice: new THREE.BoxGeometry(lebarDevice, satuanU * tinggi1U, panjangDevice),
                posLeftRightDev: 0,
                posTopBottomDev: posU[42] * satuanU - (tinggi1U * satuanU) / 2,
                posFrontBackDev: 1200 / 2 + (1200 - panjangDevice) / 2,
                texturePath: '/images/server4.jpg',
            },
            // {
            //     id: 43,
            //     name: `Devie43 U${posU[2]} Rack 2`,
            //     instansi: 'Dinas Sosial',
            //     geometryDevice: new THREE.BoxGeometry(lebarDevice, satuanU * tinggi2U, panjangDevice),
            //     posLeftRightDev: 800 / 2 + 600 / 2,
            //     // (occupied + tinggiU) * satuanU + (satuanU/2)
            //     posTopBottomDev: posU[2] * satuanU - (tinggi2U * satuanU) / 2,
            //     posFrontBackDev: 1200 / 2 + (1200 - panjangDevice) / 2,
            //     texturePath: '/images/server2.jpg',
            // },
        ]

        dataDevice.forEach((config) => {
            const texture = textureLoader.load(config.texturePath)
            const materialFront = new THREE.MeshBasicMaterial({ map: texture })
            const materialOther = new THREE.MeshBasicMaterial({ color: warnaDevice })
            const materials = [
                materialOther, // kanan
                materialOther, // kiri
                materialOther, // atas
                materialOther, // bawah
                materialFront, // depan
                materialOther, // belakang
            ]
            const cubeDevice = new THREE.Mesh(config.geometryDevice, materials)

            cubeDevice.position.set(
                config.posLeftRightDev,
                config.posTopBottomDev,
                config.posFrontBackDev
            )
            cubes.push(cubeDevice)
            scene.add(cubeDevice)

            // outline device
            const edgesDevice = new THREE.EdgesGeometry(config.geometryDevice)
            const outlineMaterialDevice = new THREE.LineBasicMaterial({
                color: 0x000000, // Warna hitam
                linewidth: 1,
            })
            const outlineDevice = new THREE.LineSegments(edgesDevice, outlineMaterialDevice)

            // cubeDevice.add(outlineDevice)
            cubeDevice.userData.id = config.id
        })
        // ==========================

        // ========MOUSEMOVE=========
        document.addEventListener('mousemove', (event) => {
            console.log('ada hover')
            // Mendapatkan posisi mouse dalam koordinat normalized device coordinates (NDC)
            // mouse.x = (event.clientX / window.innerWidth) * 2 - 1
            // mouse.y = -(event.clientY / window.innerHeight) * 2 + 1

            const rect = renderer.domElement.getBoundingClientRect();

            mouse.x = ((event.clientX - rect.left) / (rect.right - rect.left)) * 2 - 1;
            mouse.y = - ((event.clientY - rect.top) / (rect.bottom - rect.top)) * 2 + 1;



            // Lakukan raycasting untuk mendeteksi objek yang disorot oleh kursor
            raycaster.setFromCamera(mouse, camera)

            const intersects = raycaster.intersectObjects(cubes)

            // Kembalikan warna cubeDevice yang sebelumnya diklik
            if (selectedCube) {
                selectedCube.material[4].color.setHex(originalCubeColor)
                selectedCube.material[3].color.setHex(warnaDevice)
                selectedCube = null
            }

            if (intersects.length > 0) {
                console.log(intersects[0].point.x, intersects[0].point.y)
                const hoveredObject = intersects[0].object as THREE.Mesh
                const hoveredIndex = hoveredObject.userData.id

                // Simpan warna asli cubeDevice yang diklik
                originalCubeColor = hoveredObject.material[4].color.getHex()
                // originalCubeColor = hoveredObject.material[3].color.getHex()

                // Ubah warna cubeDevice yang diklik
                hoveredObject.material[4].color.set(0x0a8afa) // Misalnya, ubah warna menjadi hijau
                hoveredObject.material[3].color.set(0x0a8afa) // Misalnya, ubah warna menjadi hijau

                selectedCube = hoveredObject
                // Cari objek dengan ID yang sesuai dalam array dataDevice
                const foundObject = dataDevice.find((item) => item.id === hoveredIndex)

                if (foundObject) {
                    // Jika objek ditemukan, perbarui nilai variabel-variabel di GUI
                    guiData.ID = hoveredIndex
                    guiData.Name = foundObject.name
                    guiData.Instansi = foundObject.instansi
                }
            } else {
                // Reset nilai jika tidak ada objek yang disorot
                guiData.ID = ''
                guiData.Name = ''
                guiData.Instansi = ''
            }
        })

        // ========CONTROLS=======
        const controls = new OrbitControls(camera, renderer.domElement)


        const helper = new THREE.GridHelper(10000, 60)
        helper.position.y = 0;
        helper.material.opacity = 0.5;
        helper.material.transparent = true;
        scene.add(helper);

        // ==========GUI==========

        const gui = new dat.GUI()
        const guiData = {
            ID: '',
            Name: '',
            Instansi: '',
        }
        const folder = gui.addFolder('Information')
        folder.add(guiData, 'ID').name('ID').listen()
        folder.add(guiData, 'Name').name('Name').listen()
        folder.add(guiData, 'Instansi').name('Instansi').listen()

        const guiContainer = document.getElementById('gui-container');
        guiContainer.appendChild(gui.domElement);
        // =======================

        // ===========CLICK==========
        let originalCubeColor = 0
        let selectedCube = null

        document.addEventListener('dblclick', (_event) => {
            // Kembalikan warna cubeDevice yang sebelumnya diklik
            if (selectedCube) {
                selectedCube.material[4].color.setHex(originalCubeColor)
                selectedCube.material[3].color.setHex(originalCubeColor)
                selectedCube = null
            }

            // Lakukan raycasting untuk mendeteksi objek yang diklik
            raycaster.setFromCamera(mouse, camera)

            const intersects = raycaster.intersectObjects(cubes)

            if (intersects.length > 0) {
                const clickedObject = intersects[0].object as THREE.Mesh

                // Simpan warna asli cubeDevice yang diklik
                originalCubeColor = clickedObject.material[4].color.getHex()

                // Ubah warna cubeDevice yang diklik
                clickedObject.material[4].color.set(0x3a74f2) // Misalnya, ubah warna menjadi hijau
                clickedObject.material[3].color.set(0x3a74f2) // Misalnya, ubah warna menjadi hijau

                selectedCube = clickedObject

                // Temukan data cubeDevice berdasarkan ID
                // const clickedData = data.find((item) => item.id === clickedObject.userData.id)

                // if (clickedData) {
                //     // Gabungkan data menjadi satu string
                //     const geometryData = `Width: ${clickedData.geometryDevice.parameters.width}\nHeight: ${clickedData.geometryDevice.parameters.height}\nDepth: ${clickedData.geometryDevice.parameters.depth}`
                //     const dataString = `ID: ${clickedData.id}\nName: ${clickedData.name}\nInstansi: ${clickedData.instansi}\nGeometry:\n${geometryData}`

                //     // Buka tab baru dan tampilkan data
                //     const newWindow = window.open('', 'Device Info', 'width=400,height=300')
                //     newWindow.document.write(`
                //     <h1>Device Info</h1>
                //     <table border='solid'>
                //         <tr>
                //             <th>ID</th>
                //             <th>Device Name</th>
                //             <th>Instansi</th>
                //         </tr>
                //         <tr>
                //             <td>${clickedData.id}</td>
                //             <td>${clickedData.name}</td>
                //             <td>${clickedData.instansi}</td>
                //         </tr>
                //         </table>
                //     <pre>${dataString}</pre>`)
                //     newWindow.document.close()
                // }

                // console.log(`${clickedData.id}`)
            }
        })

        // document.addEventListener('dblclick', (_event) => {
        //     // Lakukan raycasting untuk mendeteksi objek yang diklik
        //     raycaster.setFromCamera(mouse, camera)

        //     const intersects = raycaster.intersectObjects(cubes)

        //     if (intersects.length > 0) {
        //         const clickedObject = intersects[0].object as THREE.Mesh

        //         // Temukan data cubeDevice berdasarkan ID
        //         const clickedData = dataDevice.find((item) => item.id === clickedObject.userData.id)

        //         if (clickedData) {
        //             // Gabungkan data menjadi satu string
        //             const geometryData = `Width: ${clickedData.geometryDevice.parameters.width}\nHeight: ${clickedData.geometryDevice.parameters.height}\nDepth: ${clickedData.geometryDevice.parameters.depth}`
        //             const dataString = `ID: ${clickedData.id}\nName: ${clickedData.name}\nInstansi: ${clickedData.instansi}\nGeometry:\n${geometryData}`

        //             // Buka tab baru dan tampilkan data
        //             const newWindow = window.open('', 'Device Info', '')
        //             console.table(clickedData)
        //             newWindow.document.write(`
        //         <h1>Device Info</h1>
        //         <table border='solid'>
        //             <tr>
        //                 <th>ID</th>
        //                 <th>Device Name</th>
        //                 <th>Instansi</th>
        //             </tr>
        //             <tr>
        //                 <td>${clickedData.id}</td>
        //                 <td>${clickedData.name}</td>
        //                 <td>${clickedData.instansi}</td>
        //             </tr>
        //             </table>
        //         <pre>${dataString}</pre>`)
        //             newWindow.document.close()
        //         }
        //     }
        // })

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
            <div id="gui-container" className="gui-container" />
            <div id="container" style={{ width: '100vw', height: '100vh' }} />
        </div>
    )
}

export default ThreeJS;
