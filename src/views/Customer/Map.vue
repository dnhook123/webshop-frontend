<template>
    <div class="container">
        <navbar> </navbar>
        <div class="row">
            <div class="col-sm-6">
        <GmapMap :center="center" :map-type-id="mapTypeId" :zoom="8" style="margin-top:35px">
            <GmapMarker
                    v-for="(item, index) in markers"
                    :key="index"
                    :position="item.position"
                    @click="center = item.position"
            />
        </GmapMap>
            </div>
            <div class="col-sm-3" style="margin-top: 75px">
                <h2>Locatie Belfeld</h2>
                <p>Super heerlijke klein maar fijne cafetaria!</p>
                <div class="card bg-light mb-3">
                <div class="card-body">
                    <H5> Mogelijke bezigheden</H5>
                    <ul class="list-group">
                        <li class="list-group-item bg-light">Kinderfeestjes</li>
                        <li class="list-group-item bg-light ">Friet eten</li>
                        <li class="list-group-item bg-light">Snacks eten</li>
                        <li class="list-group-item bg-light">Werken</li>
                        <li class="list-group-item bg-light">Leren</li>
                    </ul>
                </div>
            </div>
            </div>
            <div class="col-sm-3" style="margin-top: 75px">
                <h2>Locatie Lothum</h2>
                <p>Iets meer luxer maar we serveren ook friet!</p>
                <div class="card bg-light mb-3">
                    <div class="card-body">
                        <H5> Mogelijke bezigheden</H5>
                        <ul class="list-group">
                            <li class="list-group-item bg-light">Disco</li>
                            <li class="list-group-item bg-light ">Wijn drinken</li>
                            <li class="list-group-item bg-light">Tango Dansen</li>
                            <li class="list-group-item bg-light">Ontbijt</li>
                            <li class="list-group-item bg-light">School evenementen</li>
                        </ul>
                    </div>
                </div>
            </div>


        </div>


        <div class="card bg-light mb-3" style="margin-top: 5px">

            <div class="card-body">

                <h2 class="card-title">     Verantwoord frituren</h2>

              <b>  <h4 > Wij gebruiken vloeibaar frituurvet. </h4> </b>
                In vloeibare frituurvetten zitten in vergelijking met vaste frituurvetten veel goede, onverzadigde vetten. Onverzadigde vetten verlagen het cholesterolgehalte. Een hoog cholesterolgehalte is een risico voor hart- en vaatziekten.
                Wij kiezen dus voor vloeibaar frituurvet, een bewuste keuze voor uw gezondheid.
                Vloeibaar frituurvet is rijk aan goede onverzadigde vetzuren die het cholesterolgehalte verlagen, en een laag cholesterolgehalte vermindert het risico op hart- en vaatziekten.

              <b> <h4> Wij frituren volgens de Spelregels Verantwoord Frituren </h4> </b>
                Frituren vereist vakmanschap. Daarom frituren wij volgende de Spelregels Verantwoord Frituren.
                Het frituurvet wordt tijdig ververst, is altijd op de juiste temperatuur en altijd van optimale kwaliteit.

                Belangrijk want zo krijgt u de beste kwaliteit goudgele frites en de lekkerste snacks.
            </div>
        </div>

    </div>
</template>

51°18'39.4"N 6°06'44.9"E
<script>
    export default {
        data() {
            return {
                center: { lat: 51.37, lng: 6.16806},
                mapTypeId: "terrain",
                markers: [
                    { position: { lat: 51.18394, lng: 6.06449 } },
                    { position: { lat: 51.27415, lng: 6.09441 } }
                ]
            };
        }
    };
</script>

<style lang="scss" scoped>
    .vue-map-container {
        height: 450px;
        max-width: 992px;
        width: 100%;
    }
</style>
