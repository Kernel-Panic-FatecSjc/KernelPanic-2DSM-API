import { aberturaDTO } from "../DTOs/aberturaDTO";

export class aberturaModel implements aberturaDTO {
  qmPreenchendo!: string;
  dataAberturaEmpresa!: Date;
  abriuEmpresa!: boolean;
  abriuPortaoSocial!: boolean;
  abriuPortaRolante!: boolean;
  desbloqueouAlarme!: boolean;
  apagouLuzesArmazem!: boolean;
  acendeuLuzesOperacional!: boolean;
  ligouArCondicionado!: boolean;
  ligouTVCameras!: boolean;
  ligouTVDashBoard!: boolean;
  coletouChavesChaveiro!: boolean;
  abriuPortaBanheiro!: boolean;
  removeuCadeadoPortao1!: boolean;
  removeuCadeadoPortao2!: boolean;
  colocouConeEstacionamentoPCD!: boolean;
  ligouTomadaTirouPlasticoBebedouro!: boolean;
  colocouTapetesDevidosLugares!: boolean;
  fezCafe!: boolean;
  observacao!: string;

  constructor(data: aberturaDTO) {
    Object.assign(this, data);
  }
}