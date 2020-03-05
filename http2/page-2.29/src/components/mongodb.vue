<template>
  <div id="mongodb">
    <Card id="card">
      <p slot="title">
        <Icon type="md-alert" />
        Tip
      </p>
      <div id="content">
        <Alert show-icon type="warning">Please sign in firstly！</Alert>
        <Alert show-icon>The basic authentication is 'admin:pass'.</Alert>
        <Button type="primary" to="http://localhost:8081/mongo_express" target="_blank" >Go now</Button>
      </div>
    </Card>
  </div>
</template>

<script>
export default {
  name: 'MongoDB',
}
</script>
<style scoped>
#mongodb{
  width: 100%;
  min-height: inherit;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
#content{
  display: flex;
  flex-wrap: wrap;
  align-content: space-around;
  justify-content: space-around;
  width: 400px; 
  height: 200px;
}
#content > div{
  width: 400px; 
}
</style>
