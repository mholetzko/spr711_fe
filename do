build(){
    docker build --tag srp_front_end_local .
}
stop(){
    docker kill $(docker ps -q)
}

start(){
    docker run -it --rm --publish 3000:3000 srp_front_end_local
}

prune(){
    docker system prune -f -a
}

#run the command ...
$@