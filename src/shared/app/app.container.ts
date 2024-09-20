import { container } from "tsyringe";

import { OrderContainer } from "@/domain/order";
import { ProductContainer } from "@/domain/product";

import { ProvidersContainer } from "../providers/providers.container";

ProvidersContainer.register(container);

OrderContainer.register(container);
ProductContainer.register(container);
